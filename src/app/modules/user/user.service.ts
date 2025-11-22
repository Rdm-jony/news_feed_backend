import AppError from "../../errorHeplers/AppError"
import { User } from "./user.model"
import { IUser } from "./user.type"
import httpStatusCode from "http-status-codes"
import bcrypt from "bcryptjs"
import { envVars } from "../../config/env"

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

export const UserService={createUser}