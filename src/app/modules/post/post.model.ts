import { model, Schema } from "mongoose";
import { IPost, IPrivacy } from "./post.interface";

export const postSchema = new Schema<IPost>(
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
    images: {
      type: [String],
      default: null,
    },
    comments: { type: Number, default: 0 },
    privacy: {
      type: String,
      enum: [...Object.values(IPrivacy)],
      default: IPrivacy.PUBLIC,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes
postSchema.index({ createdAt: -1 });
postSchema.index({ content: "text" });

export const Post = model("Post", postSchema);
