import AppError from "../../errorHeplers/AppError";
import { Post } from "../post/post.model";
import { IComment } from "./comment.interface";
import { Comment } from "./comment.model";
import httpStatusCode from "http-status-codes"

const addComment = async (payload: Partial<IComment>, userId: string) => {
    const findPost = await Post.findById(payload.postId)
    if (!findPost) {
        throw new AppError(httpStatusCode.NOT_FOUND, "post not found")
    }

    const newComment = await Comment.create({ ...payload, author: userId })
    return newComment
}

export const CommentService = { addComment }