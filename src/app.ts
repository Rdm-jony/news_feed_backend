import express, { Request, Response } from "express"
import { globalErrorHandler } from "./app/middleware/globalErrorHendlar"
import notFound from "./app/middleware/NotFound"
import cors from "cors"
import { router } from "./app/routes"
import cookieParser from "cookie-parser"
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: [
        "https://news-feed-frontend-omega.vercel.app",
        "http://localhost:3000",
    ],
    credentials: true,
}));

app.use("/api/v1", router)

app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({
        message: "welcome to news feed server"
    })
})

app.use(globalErrorHandler)
app.use(notFound)
export default app;