//This is the Backend equivalent
// eslint-disable-next-line @typescript-eslint/no-require-imports
const murmurHash3 = require("murmurhash3js");

export enum TrafficType {
    ANONYMOUS = 'ANONYMOUS',
    USER = 'USER'
}
export type FeatureFlagSegment = {
    value: string
    audience: number
    trafficType: TrafficType
}

export type FeatureFlagStore = {
    value: string
    updatedAt: Date
    segment?: FeatureFlagSegment[]
}

class FeatureFlag {
    private FFCache: Map<string, FeatureFlagStore> = new Map();
    private trafficType: TrafficType = TrafficType.ANONYMOUS;
    private userId: string = '';
    private anonymousId: string = '';
    

    public initialize(trafficType: TrafficType, userId?: string, anonymousId?: string) {
        this.trafficType = trafficType;
        if (userId) {
            this.userId = userId;
        }
        if (!userId && anonymousId) {
            this.anonymousId = anonymousId;
        }

        return this.FFCache.entries()
    }

    public addFlag(flagName: string, flag: FeatureFlagStore) {
        this.FFCache.set(flagName, flag);
        return this.FFCache.get(flagName);
    }

    public removeFlag(flagName: string) {
        this.FFCache.delete(flagName);
    }

    public pollFlags(): Record<string, string>[] {
        const featureMap = [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [key, _value] of this.FFCache) {
            const flag = { [key]: this.getFlagSegmentValue(key, this.trafficType, this.userId, this.anonymousId) }
            featureMap.push(flag);
        }

        return featureMap;
    }

    public editFlag(flagName: string, flag: FeatureFlagStore): FeatureFlagStore {
        this.FFCache.set(flagName, flag);
        return this.FFCache.get(flagName) || { value: 'control', updatedAt: new Date() };
    }

    public getFlagValue(flagName: string): string {
        return this.getFlagSegmentValue(flagName, this.trafficType, this.userId, this.anonymousId);
    }

    private getFlagSegmentValue(flagName: string, trafficType: TrafficType, userId?: string, anonymousId?: string) {
        const flagValue = this.FFCache.get(flagName);
        const identifier: string = userId ?? anonymousId ?? '';

        if (!flagValue) {
            return 'control';
        }

        if (flagValue && (!flagValue.segment)) {
            return flagValue.value;
        } else if(flagValue.segment) {
            const bucket = this.getBucket(identifier, flagName);
            let cumulativePercentage = 0;
            const filteredSegments = flagValue.segment.filter((segment) => segment.trafficType === trafficType)
            for (const segment of filteredSegments) {
                cumulativePercentage+=segment.audience;
                if (bucket < cumulativePercentage) {
                    return segment.value;
                }
            }
        }

        return 'control'
    }

    private getBucket(identifier: string, flagName: string) {
        const hashInput = `${identifier}:${flagName}`;
        const hash = murmurHash3.x86.hash32(hashInput);
        return Math.abs(hash) % 100;
    }
}

export default FeatureFlag;