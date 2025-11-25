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
    comments:number;
    privacy: IPrivacy;
    likes: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
