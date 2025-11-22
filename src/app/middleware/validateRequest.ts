import { NextFunction, Request, Response } from "express"

export const validateRequest = (zodSchema:any) => async (req: Request, res: Response, next: NextFunction) => {
    if (req.body?.data) {
        req.body = JSON.parse(req.body.data)
    }
    req.body = await zodSchema.parseAsync(req.body)
    next()
}