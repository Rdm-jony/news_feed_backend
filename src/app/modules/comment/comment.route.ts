import { Router } from "express";
import { checkAuth } from "../../middleware/CheckAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { createCommentSchema } from "./comment.validation";
import { CommentController } from "./comment.controller";

const router = Router()

router.post("/create", checkAuth(), validateRequest(createCommentSchema), CommentController.addComment)

export const commentRoutes = router