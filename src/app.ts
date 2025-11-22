import express, { Request, Response } from "express"
import { globalErrorHandler } from "./app/middleware/globalErrorHendlar"
import notFound from "./app/middleware/NotFound"
import { router } from "./app/routes"
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router)

app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({
        message: "welcome to news feed server"
    })
})

app.use(globalErrorHandler)
app.use(notFound)
export default app;