import { Router } from "express";
import { checkAuth } from "../../middleware/CheckAuth";
import { multerUpload } from "../../config/multer.confilg";
import { createPostSchema } from "./post.validation";
import { validateRequest } from "../../middleware/validateRequest";
import { PostController } from "./post.controller";

const router=Router()

router.post(
  "/create",
  checkAuth(),
  multerUpload.array("files"), 
  validateRequest(createPostSchema),
  PostController.createPost
);

export const postRoutes=router