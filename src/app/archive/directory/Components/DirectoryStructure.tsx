"use client";
import { JSX, useEffect, useState } from "react";
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import type { Directory } from '../utils/constants';
import DirectoryNode from './DirectoryNode';


type DirectoryStructureProps = {
   data: Directory[]
}

const DirectoryStructure = ({ data }: DirectoryStructureProps): JSX.Element => {
   const [content, setContent] = useState(null)
   const params = useSearchParams();
   const url = params.get('url');

   useEffect(() => {
      if (url) {
         fetchContent(url);
      }
   }, [url]);

   const fetchContent = async (url:string) => {
      await axios.get(url)
      .then((res) => {
         setContent(res.data);
      })
      .catch((err) => {
         console.error('Found an error', err);
      })
   }

   return (
      <div className="h-full w-full relative flex grow">
         <aside className="h-full absolute top-0 left-0 w-[200px] border-r border-white overflow-x-auto">
            <DirectoryNode data={data} />
         </aside>
         <div className="ml-[210px] h-full w-full flex items-center justify-center flex-col" test-id="content">
            {content ? content : null}
         </div>

      </div>
   )
}

export default DirectoryStructure;