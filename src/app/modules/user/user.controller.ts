import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { IUser } from "./user.type";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatusCode from "http-status-codes"

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

export const UserController={createUser}