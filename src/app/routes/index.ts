import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";


export const router = Router()

const moduleRoutes = [
 
    {
        route: "/user",
        path: userRoutes
    },


]

moduleRoutes.forEach(route => router.use(route.route, route.path))