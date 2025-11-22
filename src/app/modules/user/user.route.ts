import { Router } from "express"
import { multerUpload } from "../../config/multer.confilg"
import { validateRequest } from "../../middleware/validateRequest"
import { createUserSchema } from "./user.validation"
import { UserController } from "./user.controller"

const router=Router()

router.post("/register", multerUpload.single("file"), validateRequest(createUserSchema), UserController.createUser)

export const userRoutes=router
