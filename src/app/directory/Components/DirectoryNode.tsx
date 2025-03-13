"use client";

import { JSX, useState } from "react";
import cn from 'classnames';
import { Directory } from "../utils/constants";
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid'


const Icon = ({ isOpen, isParent }: { isOpen: boolean, isParent: boolean }): JSX.Element => {
   if (isParent) {
      return isOpen ? <ChevronDownIcon className="ml-2 w-4 h-4" /> : <ChevronRightIcon className="ml-2 w-4 h-4" />
   }

   return <></>;
}

const Node = ({ node }: {node: Directory }) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);

   const handleClick = () => {
      setIsOpen((prevOpen) => !prevOpen)
   }
   const isParent = node?.children && node.children.length > 0 || false;

   return (
      <li className="pl-3">
         <div 
            className={cn("flex flex-row mt-2 items-center cursor-pointer", {
               'underline': node?.url
            })} 
            onClick={handleClick}
         >
            {node.name}
            <Icon isOpen={isOpen} isParent={isParent} />
         </div>
         {isOpen && node?.children && node?.children?.length > 0 && (
            <DirectoryNode data={node.children} />
         )}
      </li>
   )
}

const DirectoryNode = ({ data }: { data: Directory[]}): JSX.Element => {
   return (
      <ul className="relative flex flex-col">
         {data.map((node) => {
            return <Node key={node.id} node={node} />
         })}
      </ul>
   )
}

export default DirectoryNode;