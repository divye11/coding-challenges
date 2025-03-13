import type { Directory } from '../utils/constants';
import { JSX } from "react";
import DirectoryNode from './DirectoryNode';

type DirectoryStructureProps = {
   data: Directory[]
}
const DirectoryStructure = ({ data }: DirectoryStructureProps): JSX.Element => {
   return (
      <div className="h-full w-full relative flex grow">
         <aside className="h-full absolute top-0 left-0 w-[200px] border-r border-white overflow-x-auto">
            <DirectoryNode data={data} />
         </aside>
         <div className="ml-[290px] h-full w-full flex items-center justify-center">
            Content
         </div>

      </div>
   )
}

export default DirectoryStructure;