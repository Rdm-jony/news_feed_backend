/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import { deleteImageFromCLoudinary } from "../config/cloudinary.config"
import { TErrorSource } from "../errorHeplers/error.type"
import { handleZodeError } from "../errorHeplers/ZodError"
import { handleValidationError } from "../errorHeplers/ValidationError"
import { handleDuplicateError } from "../errorHeplers/DuplicateError"
import { handleCastError } from "../errorHeplers/CastErroor"
import AppError from "../errorHeplers/AppError"


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500
    let message = "something went wrong!"

    if (req.file) {
        await deleteImageFromCLoudinary(req.file.path)
    }

    if (req.files && Array.isArray(req.files) && req.files.length) {
        const imageUrls = (req.files as Express.Multer.File[]).map(file => file.path)


        await Promise.all(imageUrls.map(url => deleteImageFromCLoudinary(url)))
    }


    let errorSources: TErrorSource[] = []
    if (err.name === 'ZodError') {
        const simplyfiedError = handleZodeError(err)
        statusCode = simplyfiedError.statusCode;
        message = simplyfiedError.message;
        errorSources = simplyfiedError.errorSources as TErrorSource[]
    }
    else if (err.name === "ValidationError") {
        const simplyfiedError = handleValidationError(err)
        statusCode = simplyfiedError.statusCode
        message = simplyfiedError.message
        errorSources = simplyfiedError.errorSources as TErrorSource[]
    }
    else if (err.code == 11000) {
        const simplyfiedError = handleDuplicateError(err)
        statusCode = simplyfiedError.statusCode
        message = simplyfiedError.message
    }
    else if (err.name === "CastError") {
        const simplyfiedError = handleCastError()
        statusCode = simplyfiedError.statusCode
        message = simplyfiedError.message
    }

    else if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    } else if (err instanceof Error) {
        statusCode = 500
        message = err.message
    }
    res.status(statusCode).json({
        message,
        errorSources,
        err: envVars.NODE_ENV == "development" ? err : null,
        stack: envVars.NODE_ENV == "development" ? err.stack : null
    })
}
