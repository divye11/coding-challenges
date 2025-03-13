export interface Comment {
   id: string
   content: string
   authorName: string
   authorImage?: string
   createdAt?: Date
   updatedAt?: Date
   comments?: Comment[]
   likes: number
   parentId: string | null
   disLikes: number
   authorId: string
   metadata: Record<string, unknown>
}

export interface CommentStructure {
   [id: string]: Comment
}