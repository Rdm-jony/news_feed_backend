import mongoose from "mongoose";

export interface IComment {
    postId: mongoose.Types.ObjectId;
    author: mongoose.Types.ObjectId;
    text: string;
}