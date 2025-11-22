import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { JwtPayload } from "jsonwebtoken"
import { CommentService } from "./comment.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatusCode from "http-status-codes"

const addComment = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload
    const newComment = await CommentService.addComment(req.body, decodedToken.userId)
    sendResponse(res, {
        data: newComment,
        message: "comment created successfully!",
        statusCode: httpStatusCode.CREATED,
        success: true,

    })
})

const getCommentsWithReplies = catchAsync(async (req: Request, res: Response) => {
    const postId = req.params.postId
    const comments = await CommentService.getCommentsWithReplies(postId)
    sendResponse(res, {
        data: comments,
        message: "comments retrived successfully!",
        statusCode: httpStatusCode.OK,
        success: true,

    })
})

export const CommentController = { addComment, getCommentsWithReplies }