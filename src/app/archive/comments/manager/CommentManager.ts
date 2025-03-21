import { Comment } from "../types"

class CommentManager {
   private commentMap: Map<string, Comment>;
   private rootComments: Comment[]
   private listeners: Set<() => void>

   constructor(initialComments: Comment[]) {
      this.commentMap = new Map<string, Comment>();
      this.rootComments = [];
      this.listeners = new Set<() => void>()
      this.buildTree(initialComments);
   }

   public buildTree(initialComments: Comment[]): void {
      this.commentMap.clear();
      this.rootComments = [];
      const pending = new Map();

      for (const comment of initialComments) {
         const modifiedComment = {...comment, comments: []}
         this.commentMap.set(comment.id, modifiedComment);

         if (pending.get(comment.id)) {
            modifiedComment.comments = pending.get(comment.id);
            pending.delete(comment.id);
         }

         if (comment.parentId) {
            const parent = this.commentMap.get(comment.parentId);
            if (!!parent) {
               parent.comments?.push(modifiedComment);
            } else {
               pending.set(comment.parentId, [...pending.get(comment.parentId) || [], modifiedComment])
            }
         } else {
            this.rootComments.push(modifiedComment);
         }
      }
   }

   public getCommentTree(): Comment[] {
      return this.rootComments;
   }

   public addComment(comment: Comment): void {
      const modifiedComment = { ...comment, comments: [] };
      
      this.commentMap.set(modifiedComment.id, modifiedComment);
      
      if (modifiedComment.parentId) {
         const parent = this.commentMap.get(modifiedComment.parentId);
         if (parent) {
            if (!parent.comments) {
               parent.comments = [];
            }
            parent.comments.push(modifiedComment);
         }
      } else {
         this.rootComments.push(modifiedComment);      
      }

      this.rootComments = [...this.rootComments];
  
      this.notify();
   }

   public removeComment(comment: Comment) {
      this.commentMap.delete(comment.id);
      if (comment.parentId) {
         const parent = this.commentMap.get(comment.parentId);
         if (parent) {
            parent.comments = parent?.comments?.filter((cmt) => cmt.id !== comment.id);
         }
      } else {
         this.rootComments = this.rootComments.filter((cmt) => cmt.id !== comment.id);
      }
      this.notify();
   }

   public addLike(comment: Comment) {
      const cmt = this.commentMap.get(comment.id);
      if (cmt) {
         cmt.likes = (cmt.likes || 0) +  1;
      }
      this.rootComments = [...this.rootComments];
      this.notify();
   }

   public subscribe(callback: () => void): () => void {
      this.listeners.add(callback);
      return () => {
         this.listeners.delete(callback);
      }
   }

   public notify() {
      for (const listener of this.listeners) {
         listener();
      }
   }

   public getSnapShot(): { comments: Comment[] } {
      return { comments: this.rootComments };
   }
}

export default CommentManager;