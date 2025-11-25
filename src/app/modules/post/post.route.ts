import { Router } from "express";
import { checkAuth } from "../../middleware/CheckAuth";
import { multerUpload } from "../../config/multer.confilg";
import { createPostSchema } from "./post.validation";
import { validateRequest } from "../../middleware/validateRequest";
import { PostController } from "./post.controller";

const router = Router()

router.post(
    "/create",
    checkAuth(),
    multerUpload.array("files"),
    validateRequest(createPostSchema),
    PostController.createPost
);

router.get("/all", checkAuth(), PostController.getAllPost)

router.patch("/like-toggle/:postId", checkAuth(), PostController.toggleLikeOnPost)
router.get("/liked/:postId", checkAuth(), PostController.getLikedUsers)

export const postRoutes = router