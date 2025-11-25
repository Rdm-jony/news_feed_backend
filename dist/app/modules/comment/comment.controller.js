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
exports.CommentController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const comment_service_1 = require("./comment.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const addComment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const newComment = yield comment_service_1.CommentService.addComment(req.body, decodedToken.userId);
    (0, sendResponse_1.sendResponse)(res, {
        data: newComment,
        message: "comment created successfully!",
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
    });
}));
const getCommentsWithReplies = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const comments = yield comment_service_1.CommentService.getCommentsWithReplies(postId);
    (0, sendResponse_1.sendResponse)(res, {
        data: comments,
        message: "comments retrived successfully!",
        statusCode: http_status_codes_1.default.OK,
        success: true,
    });
}));
exports.CommentController = { addComment, getCommentsWithReplies };
