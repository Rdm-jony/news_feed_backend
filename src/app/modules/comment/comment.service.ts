import { IComment } from "./comment.interface";
import { Comment } from "./comment.model";

const addComment = async (payload: Partial<IComment>, userId: string) => {
    const newComment = await Comment.create({ ...payload, author: userId })
    return newComment
}

export const CommentService = { addComment }