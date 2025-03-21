import { JSX } from "react";
import ContainerPage from "../components/Common/Container";
import DirectoryStructure from "./Components/DirectoryStructure";
import { data } from './utils/constants'; 

const DirectoryComponent = (): JSX.Element => {
   return (
      <ContainerPage>
         <div className="w-full flex flex-col grow items-center">
            <h1 className="text-2xl my-5">
               Directory Component
            </h1>
            <DirectoryStructure data={data} />
         </div>
      </ContainerPage>
   )
}

export default DirectoryComponent