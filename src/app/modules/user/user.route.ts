import { Router } from "express"
import { multerUpload } from "../../config/multer.confilg"
import { validateRequest } from "../../middleware/validateRequest"
import { createUserSchema, userLoginSchema } from "./user.validation"
import { UserController } from "./user.controller"
import { checkAuth } from "../../middleware/CheckAuth"

const router = Router()

router.post("/register", multerUpload.single("file"), validateRequest(createUserSchema), UserController.createUser)
router.post("/login", validateRequest(userLoginSchema), UserController.userLogIn)
router.get("/me", checkAuth(), UserController.getMe)


export const userRoutes = router
