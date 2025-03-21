"use client";

import { useState, JSX } from "react";
import { faker } from "@faker-js/faker";
import Comment from "./Comment";
import useCommentManager from "@/context/CommentManagerContext/useCommentManager";

const CommentsContent = (): JSX.Element => {
   const [inputText, setInputText] = useState<string>('')
   const { comments: data, manager } = useCommentManager();

   const renderComments = (comments: Comment[], depth: number): JSX.Element[] => {
      return comments.map((comment) => (
         <div key={comment.id}>
            <Comment 
               key={comment.id} 
               comment={comment} 
               depth={depth} 
            />
            {comment.comments && renderComments(comment.comments, depth + 1)}
         </div>
      ));
   }

   const handleAddComment = () => {
      const newComment = {
         id: faker.string.uuid(),
         content: inputText,
         authorName: faker.person.firstName(),
         createdAt: faker.date.anytime(),
         updatedAt: faker.date.anytime(),
         comments: [],
         likes: 0,
         parentId: null,
         disLikes: 0,
         authorId: 'df',
         metadata: {}
      }

      manager.addComment(newComment);
      setInputText('');

   }

   return (
      <div className="flex flex-col flex-grow-1">
         <div className="w-full p-5 flex flex-row border-1 border-gray-50 rounded-sm justify-around text-xl">
            <input 
               className="border-0 w-full font-mono focus-visible:outline-none" 
               onChange={(e) => {
                  setInputText(e.target.value)
               }}
               value={inputText}
            />
            <button className="ml-5 cursor-pointer" onClick={handleAddComment}>Submit</button>
         </div>
         <div className="mt-8">
            {data.length > 0 ? renderComments(data, 1) : <div>No comments available</div>}
         </div>
      </div>
   )
}

export default CommentsContent; 