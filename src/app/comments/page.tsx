"use client";

import type { JSX } from 'react';
import ContainerPage from "../components/Common/Container";
import { CommentManagerProvider } from '@/context/CommentManagerContext';
import CommentsContent from './components/CommentsContent';

const CommentsUI = (): JSX.Element => {
   return (
      <CommentManagerProvider initialComments={[]}>
         <ContainerPage>
            <div className="mt-8 font-medium font-mono text-lg">Comments UI</div>
            <div className="mt-5 w-full flex justify-center">
               <CommentsContent />
            </div>
         </ContainerPage>
      </CommentManagerProvider>
   )
}

export default CommentsUI;