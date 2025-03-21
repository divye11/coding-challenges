"use client";

import { useState, type JSX } from "react";
import { faker } from "@faker-js/faker";
import type { Comment } from "../types";
import useCommentManager from "@/context/CommentManagerContext/useCommentManager";

interface CommentProps {
   comment: Comment;
   depth: number;
}

const Comment = (props: CommentProps): JSX.Element => {
   const { comment, depth } = props; 
   const [isCommentOpen, setCommentOpen] = useState<boolean>(false)
   const [inputComment, setInputComment] = useState<string>('')
   const { manager } = useCommentManager()

   const toggleCommentState = () => {
      setCommentOpen((prevState) => !prevState)
   }

   const addSubComment = (parentId: string) => {
      const comment: Comment = {
         id: faker.string.uuid(),
         content: inputComment,
         authorName: faker.person.firstName(),
         createdAt: faker.date.anytime(),
         updatedAt: faker.date.anytime(),
         comments: [],
         likes: 0,
         parentId,
         disLikes: 0,
         authorId: 'df',
         metadata: {}
      }
      manager.addComment(comment);
      setInputComment('')
   }

   const addLike = (comment: Comment) => {
      manager.addLike(comment);
   }

   return (
      <div className={`p-5 mt-3 border-1 border-white`} style={{ marginLeft: `${depth * 10}px`}}>
         <div className="text-sm font-medium font-mono">
            {comment.content}
         </div>
         <div className="flex w-full justify-between mt-2 text-gray">
            <div className="cursor-pointer" >
               <div onClick={toggleCommentState}>Comment</div>
               <div onClick={() => addLike(comment)}>Like {comment.likes}</div>
            </div>
            <div>
               <span>{comment.authorName}</span>
               <span>{new Date(comment.updatedAt).toLocaleString()}</span>
            </div>
         </div>
         {isCommentOpen && (
            <div className="mt-1 w-full flex flex-row border-1 border-white p-2">
               <input 
                  value={inputComment} 
                  onChange={(e) => setInputComment(e.target.value)}
                  className="border-0 w-full font-mono focus-visible:outline-none"
               />
               <button 
                  className="ml-5 cursor-pointer" 
                  onClick={() => {
                     addSubComment(comment.id)
                  }}
               >
                  Submit
               </button>
            </div>
         )}
      </div>
   )
}
export default Comment;