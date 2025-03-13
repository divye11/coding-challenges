import { JSX, ReactNode } from "react";
import Navbar from "./Navbar";

type ContainerPageProps = {
   children: ReactNode;
};

const ContainerPage = ({ children }: ContainerPageProps): JSX.Element => {
   return (
      <div className="flex flex-grow-1 flex-col min-w-100 items-center">
         <Navbar />
         <div className="flex flex-col max-w-[862px] items-center w-[100%] grow">
            {children}
         </div>
      </div>
   );
};

export default ContainerPage;