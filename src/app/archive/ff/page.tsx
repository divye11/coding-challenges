import { JSX } from "react";
import ContainerPage from "../components/Common/Container";
import { FeatureFlagWrapper } from "./utils/FeatureFlagContext";
import FeatureFlags from "./Components/FeatureFlags";

const FeatureFlag = (): JSX.Element => {
    return (
        <ContainerPage>
            <div className="h-full w-full flex justify-center items-center mt-10 flex-col">
                <h1 className="text-2xl">Feature Flag Implementation</h1>
                <FeatureFlagWrapper>
                    <FeatureFlags />
                </FeatureFlagWrapper>
            </div>
        </ContainerPage>
    )
}   

export default FeatureFlag;