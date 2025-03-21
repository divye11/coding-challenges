import { JSX, ReactNode } from "react";
import Navbar from "./Navbar";
import classNames from "classnames";

type ContainerPageProps = {
   children: ReactNode;
   containerClassName?: string;
};

const ContainerPage = ({ children, containerClassName }: ContainerPageProps): JSX.Element => {
   return (
      <div className="flex flex-grow-1 flex-col min-w-100 items-center">
         <Navbar />
         <div className={classNames("flex flex-col max-w-[862px] items-center w-[100%] grow", containerClassName)}>
            {children}
         </div>
      </div>
   );
};

export default ContainerPage;