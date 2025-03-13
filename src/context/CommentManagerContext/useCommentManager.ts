"use client";
import { useContext, useEffect, useState } from "react"
import { CommentManagerContext } from "."

const useCommentManager = () => {
  const manager = useContext(CommentManagerContext);
   
  if (!manager) {
    throw new Error("useCommentManager must be used within a CommentManagerProvider");
  }

  const [tree, setTree] = useState(manager.getCommentTree());

  useEffect(() => {
    const unsubscribe = manager.subscribe(() => {
      setTree(manager.getCommentTree())
    })

    return () => {
      unsubscribe();
    }
  }, [manager])


  return { comments: tree, manager };
}  

export default useCommentManager