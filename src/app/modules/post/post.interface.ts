import mongoose from "mongoose";
import { IComment } from "../comment/comment.interface";

export enum IPrivacy {
    PUBLIC = "public",
    PRIVATE = "private"
}

export interface IPost {
    _id?: string;
    author: mongoose.Types.ObjectId;
    content: string;
    images?: string[] | null;
    privacy: IPrivacy;
    likes: string[];
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
}
