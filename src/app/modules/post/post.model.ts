import { model, Schema } from "mongoose";
import { IPrivacy } from "./post.interface";
import { commentSchema } from "../comment/comment.model";

export const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    privacy: {
      type: String,
      enum: [Object.values(IPrivacy)],
      default: IPrivacy.PUBLIC,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

// Indexes
postSchema.index({ createdAt: -1 }); 
postSchema.index({ content: "text" }); 

export const Post = model("Post", postSchema);
