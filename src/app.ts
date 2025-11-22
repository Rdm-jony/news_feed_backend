import express, { Request, Response } from "express"
import { globalErrorHandler } from "./app/middleware/globalErrorHendlar"
const app = express()

app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({
        message: "welcome to news feed server"
    })
})

app.use(globalErrorHandler)
export default app;