import AppError from "../../errorHeplers/AppError"
import { User } from "./user.model"
import { IUser } from "./user.type"
import httpStatusCode from "http-status-codes"
import bcrypt from "bcryptjs"
import { envVars } from "../../config/env"
import { setAuthCookie } from "../../utils/setCookies"
import { createUserTokens } from "../../utils/userTokens"

const createUser = async (payload: Partial<IUser>) => {
    const email = payload.email
    const isUserExists = await User.findOne({ email })
    if (isUserExists) {
        throw new AppError(httpStatusCode.BAD_REQUEST, "user already exists!!")
    }
    const hashPassword = bcrypt.hashSync(payload.password as string, parseInt(envVars.BCRYPT_SALT))

    const user = await User.create({ ...payload, password: hashPassword })
    const { password, ...safeUser } = user.toObject();
    return safeUser;
}

const userLogIn = async (payload: { email: string, password: string }) => {
    const user = await User.findOne({ email: payload.email });
    if (!user) {
        throw new AppError(httpStatusCode.NOT_FOUND, "Invalid email or password")
    }

    const isPasswordValid = bcrypt.compareSync(payload.password, user.password);
    if (!isPasswordValid) {
        throw new AppError(httpStatusCode.BAD_REQUEST, "Invalid email or password")

    }

    const userTokens = createUserTokens(user)
    const { password: _, ...safeUser } = user.toObject();
    return {
        user: safeUser,
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken
    }
}

const getMe = async (userId: string) => {
    const isUserExists = await User.findById(userId).select("-password")
    if (!isUserExists) {
        throw new AppError(httpStatusCode.NOT_FOUND, "user not found!")
    }

    return isUserExists
}


export const UserService = { createUser, getMe,userLogIn }