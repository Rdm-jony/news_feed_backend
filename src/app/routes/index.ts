import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { postRoutes } from "../modules/post/post.route";


export const router = Router()

const moduleRoutes = [

    {
        route: "/user",
        path: userRoutes
    },
    {
        route: "/post",
        path: postRoutes
    }


]

moduleRoutes.forEach(route => router.use(route.route, route.path))