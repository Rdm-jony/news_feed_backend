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
exports.CommentService = exports.addComment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errorHeplers/AppError"));
const post_model_1 = require("../post/post.model");
const comment_model_1 = require("./comment.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const addComment = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const findPost = yield post_model_1.Post.findById(payload.postId).session(session);
        if (!findPost) {
            throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Post not found");
        }
        const newComment = yield comment_model_1.Comment.create([Object.assign(Object.assign({}, payload), { author: userId })], { session });
        const commentCount = yield comment_model_1.Comment.countDocuments({
            postId: payload.postId,
        }).session(session);
        findPost.comments = commentCount;
        yield findPost.save({ session });
        yield session.commitTransaction();
        session.endSession();
        return newComment[0];
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
exports.addComment = addComment;
const getCommentsWithReplies = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const findPost = yield post_model_1.Post.findById(postId);
    if (!findPost) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "post not found");
    }
    const objectId = new mongoose_1.default.Types.ObjectId(postId);
    const comments = yield comment_model_1.Comment.aggregate([
        { $match: { postId: objectId } },
        //Lookup replies (parentId = _id)
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "parentId",
                as: "replies",
            },
        },
        // top-level comments (parentId = null)
        { $match: { parentId: null } },
        //Sort comments by newest first
        { $sort: { createdAt: -1 } },
        //Populate author info for comments
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author",
            },
        },
        {
            $unwind: "$author",
        },
        // Populate author info for replies
        {
            $unwind: { path: "$replies", preserveNullAndEmptyArrays: true },
        },
        {
            $lookup: {
                from: "users",
                localField: "replies.author",
                foreignField: "_id",
                as: "replies.author",
            },
        },
        {
            $unwind: { path: "$replies.author", preserveNullAndEmptyArrays: true },
        },
        {
            $group: {
                _id: "$_id",
                postId: { $first: "$postId" },
                parentId: { $first: "$parentId" },
                text: { $first: "$text" },
                likes: { $first: "$likes" },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "$updatedAt" },
                author: { $first: "$author" },
                replies: { $push: "$replies" },
            },
        },
        // sort replies by newest first
        {
            $addFields: {
                replies: {
                    $filter: {
                        input: "$replies",
                        as: "reply",
                        cond: { $ne: ["$$reply._id", null] },
                    },
                },
            },
        },
    ]);
    return comments;
});
exports.CommentService = { addComment: exports.addComment, getCommentsWithReplies };
