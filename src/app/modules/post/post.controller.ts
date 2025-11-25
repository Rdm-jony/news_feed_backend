import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { IPost } from "./post.interface"
import { PostService } from "./post.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatusCode from "http-status-codes"
import { JwtPayload } from "jsonwebtoken"

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
const getAllPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload
    const query = req.query as Record<string, string>
    const posts = await PostService.getAllPost(query, decodedToken.userId)
    sendResponse(res, {
        data: posts.getPosts,
        meta: posts.meta,
        message: "post retrived successfully!",
        statusCode: httpStatusCode.OK,
        success: true,

    })
})

const toggleLikeOnPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload
    const postId = req.params.postId
    const post = await PostService.toggleLikeOnPost(postId, decodedToken.userId)
    sendResponse(res, {
        data: post,
        message: "post liked successfully!",
        statusCode: httpStatusCode.OK,
        success: true,

    })
})
const getLikedUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId
    const likedUser = await PostService.getLikedUsers(postId)
    sendResponse(res, {
        data: likedUser,
        message: "liked retrived successfully!",
        statusCode: httpStatusCode.OK,
        success: true,

    })
})


export const PostController = { createPost, getAllPost, toggleLikeOnPost,getLikedUsers }