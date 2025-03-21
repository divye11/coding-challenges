import ContainerPage from "../components/Common/Container";
import FlagTable from "./components/FlagTable";
import { FFContextProvider } from "./context/FFManager";

const FeatureFlags :React.FC = () => {
   const id = Math.random() % 100
   return (
      <ContainerPage>
         <h1 className="mt-5 text-4xl">Feature Flags</h1>
         <FFContextProvider identifier={id.toString()} trafficType="anonymous" >
            <FlagTable />         
         </FFContextProvider>

      </ContainerPage>
   )
}

export default FeatureFlags;