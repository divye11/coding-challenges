"use client";

import { createContext } from "react";
import FeatureFlag, { TrafficType } from "./FeatureFlag";

type FeatureFlagWrapperProps = {
   children: React.ReactNode
   userId?: string
}

export const FeatureFlagContext = createContext<{ manager: FeatureFlag} | null>(null)

export const FeatureFlagWrapper = ({ children, userId }: FeatureFlagWrapperProps) => {
   const FeatureFlagManager = new FeatureFlag();

   if (!FeatureFlagManager) {
      throw new Error('Feature Flag Manager not initialized');
   }

   if (userId) {
      FeatureFlagManager.initialize(TrafficType.USER, userId);
   } else {
      const randomUUID = crypto.randomUUID();
      localStorage.setItem('anonymousId', randomUUID);
      FeatureFlagManager.initialize(TrafficType.ANONYMOUS, '', randomUUID)
   }

   return <FeatureFlagContext.Provider value={{ manager: FeatureFlagManager }}>{children}</FeatureFlagContext.Provider>
}