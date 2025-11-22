import mongoose from "mongoose";

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
    createdAt: Date;
    updatedAt: Date;
}
