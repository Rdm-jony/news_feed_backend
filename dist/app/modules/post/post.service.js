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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = exports.toggleLikeOnPost = void 0;
const queryBuilder_1 = require("../../utils/queryBuilder");
const post_constant_1 = require("./post.constant");
const post_interface_1 = require("./post.interface");
const post_model_1 = require("./post.model");
const createPost = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const newpost = yield post_model_1.Post.create(Object.assign(Object.assign({}, payload), { author: userId }));
    return newpost;
});
const getAllPost = (query, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new queryBuilder_1.QueryBuilder(post_model_1.Post.find({
        $or: [
            { privacy: post_interface_1.IPrivacy.PUBLIC }, // public posts
            { author: userId, privacy: post_interface_1.IPrivacy.PRIVATE } // own private posts
        ],
    }), query);
    const getPosts = yield queryBuilder
        .filter()
        .search(post_constant_1.postSearChQueryFields)
        .sort()
        .fields()
        .paginate()
        .build().populate("author");
    const meta = yield queryBuilder.getMeta();
    return {
        getPosts,
        meta
    };
});
const toggleLikeOnPost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isLiked = yield post_model_1.Post.exists({ _id: postId, likes: userId });
    let updateQuery;
    if (isLiked) {
        updateQuery = { $pull: { likes: userId } };
    }
    else {
        updateQuery = { $addToSet: { likes: userId } };
    }
    const updatedPost = yield post_model_1.Post.findByIdAndUpdate(postId, updateQuery, { new: true });
    return updatedPost;
});
exports.toggleLikeOnPost = toggleLikeOnPost;
const getLikedUsers = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.findById(postId)
        .select("likes")
        .populate("likes", "firstName lastName avatarUrl");
    if (!post) {
        throw new Error("Post not found");
    }
    return post.likes;
});
exports.PostService = {
    toggleLikeOnPost: exports.toggleLikeOnPost,
    createPost,
    getAllPost,
    getLikedUsers
};
