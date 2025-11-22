import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { IUser } from "./user.type";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatusCode from "http-status-codes"
import { JwtPayload } from "jsonwebtoken";
import { setAuthCookie } from "../../utils/setCookies";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const payload: IUser = {
        ...req.body,
        avatarUrl: req.file?.path
    }
    const user = await UserService.createUser(payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.CREATED,
        message: "user create successfully",
        data: user,
    })
});

const userLogIn = catchAsync(async (req: Request, res: Response) => {

    const userInfo = await UserService.userLogIn(req.body);
    setAuthCookie(res, { accessToken: userInfo.accessToken, refreshToken: userInfo.refreshToken })
    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.OK,
        message: "user Logged In successfully",
        data: userInfo.user,
    })
});

const getMe = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload
    const user = await UserService.getMe(decodedToken.userId)
    sendResponse(res, {
        data: user,
        message: "user retrived successfully",
        statusCode: httpStatusCode.OK,
        success: true
    })
})

export const UserController = { createUser, userLogIn, getMe }