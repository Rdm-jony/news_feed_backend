"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const post_route_1 = require("../modules/post/post.route");
const comment_route_1 = require("../modules/comment/comment.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        route: "/user",
        path: user_route_1.userRoutes
    },
    {
        route: "/post",
        path: post_route_1.postRoutes
    },
    {
        route: "/comment",
        path: comment_route_1.commentRoutes
    }
];
moduleRoutes.forEach(route => exports.router.use(route.route, route.path));
