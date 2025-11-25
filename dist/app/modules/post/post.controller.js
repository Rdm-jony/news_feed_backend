"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const post_service_1 = require("./post.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createPost = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const decodedToken = req.user;
    const payload = Object.assign(Object.assign({}, req.body), { images: (_a = req.files) === null || _a === void 0 ? void 0 : _a.map(file => file.path) });
    const newPost = yield post_service_1.PostService.createPost(payload, decodedToken.userId);
    (0, sendResponse_1.sendResponse)(res, {
        data: newPost,
        message: "post created successfully!",
        statusCode: http_status_codes_1.default.CREATED,
        success: true
    });
}));
const getAllPost = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const query = req.query;
    const posts = yield post_service_1.PostService.getAllPost(query, decodedToken.userId);
    (0, sendResponse_1.sendResponse)(res, {
        data: posts.getPosts,
        meta: posts.meta,
        message: "post retrived successfully!",
        statusCode: http_status_codes_1.default.OK,
        success: true,
    });
}));
const toggleLikeOnPost = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const postId = req.params.postId;
    const post = yield post_service_1.PostService.toggleLikeOnPost(postId, decodedToken.userId);
    (0, sendResponse_1.sendResponse)(res, {
        data: post,
        message: "post liked successfully!",
        statusCode: http_status_codes_1.default.OK,
        success: true,
    });
}));
const getLikedUsers = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const likedUser = yield post_service_1.PostService.getLikedUsers(postId);
    (0, sendResponse_1.sendResponse)(res, {
        data: likedUser,
        message: "liked retrived successfully!",
        statusCode: http_status_codes_1.default.OK,
        success: true,
    });
}));
exports.PostController = { createPost, getAllPost, toggleLikeOnPost, getLikedUsers };
