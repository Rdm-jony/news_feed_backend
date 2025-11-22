import mongoose from "mongoose";
import { IComment } from "./comment.interface";

const commentSchema = new mongoose.Schema<IComment>({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

commentSchema.index({ createdAt: -1 });

export const Comment = mongoose.model<IComment>("Comment", commentSchema);