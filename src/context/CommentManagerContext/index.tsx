import { createContext, useRef, ReactNode, useEffect } from "react";
import CommentManager from "@/app/comments/manager/CommentManager";
import { Comment } from "@/app/comments/types";

export const CommentManagerContext = createContext<CommentManager | null>(null);

export const CommentManagerProvider = ({ children, initialComments }: { children: ReactNode, initialComments: Comment[] }) => {
   const commentManagerRef = useRef<CommentManager>(null);

   if (!commentManagerRef.current) {
      commentManagerRef.current = new CommentManager(initialComments);
   }

   useEffect(() => {
      if (commentManagerRef.current) {
         commentManagerRef.current.buildTree(initialComments);
         commentManagerRef.current.notify();
      }
    }, [initialComments, commentManagerRef]);

   return <CommentManagerContext.Provider value={commentManagerRef.current}>{children}</CommentManagerContext.Provider>
}
