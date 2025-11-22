import mongoose from "mongoose";

export interface IComment {
  _id?: string;
  postId: mongoose.Types.ObjectId;
  parentId?: mongoose.Types.ObjectId | null; // null for top-level comment, else parent comment id
  author: mongoose.Types.ObjectId; 
  text: string;
  likes: mongoose.Types.ObjectId[]; 
 
}
