"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
const post_interface_1 = require("./post.interface");
exports.postSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    images: {
        type: [String],
        default: null,
    },
    comments: { type: Number, default: 0 },
    privacy: {
        type: String,
        enum: [...Object.values(post_interface_1.IPrivacy)],
        default: post_interface_1.IPrivacy.PUBLIC,
    },
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, {
    timestamps: true,
});
// Indexes
exports.postSchema.index({ createdAt: -1 });
exports.postSchema.index({ content: "text" });
exports.Post = (0, mongoose_1.model)("Post", exports.postSchema);
