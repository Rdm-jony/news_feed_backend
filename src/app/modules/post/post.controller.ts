import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { IPost } from "./post.interface"
import { PostService } from "./post.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatusCode from "http-status-codes"

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user
    const payload: IPost = {
        ...req.body,
        images: (req.files as Express.Multer.File[])?.map(file => file.path)
    }
    const newPost = await PostService.createPost(payload, decodedToken.userId)
    sendResponse(res, {
        data: newPost,
        message: "post created successfully!",
        statusCode: httpStatusCode.CREATED,
        success: true
    })
})

export const PostController = { createPost }