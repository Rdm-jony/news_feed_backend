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

export const CommentController={addComment}