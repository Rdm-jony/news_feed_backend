"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    postId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    parentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
    likes: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, {
    timestamps: true,
});
commentSchema.index({ createdAt: -1 });
exports.Comment = mongoose_1.default.model("Comment", commentSchema);
