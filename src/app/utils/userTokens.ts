import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { generateToken, verifyToken } from "./jwt";
import { User } from "../modules/user/user.model";
import httpStatusCode from "http-status-codes"
import { IUser } from "../modules/user/user.interface";

export const createUserTokens = (user: Partial<IUser>) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
    }

    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)
    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

    return {
        accessToken,
        refreshToken
    }
}

