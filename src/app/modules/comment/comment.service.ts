import mongoose from "mongoose";
import AppError from "../../errorHeplers/AppError";
import { Post } from "../post/post.model";
import { IComment } from "./comment.interface";
import { Comment } from "./comment.model";
import httpStatusCode from "http-status-codes"


export const addComment = async (
  payload: Partial<IComment>,
  userId: string
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const findPost = await Post.findById(payload.postId).session(session);
    if (!findPost) {
      throw new AppError(httpStatusCode.NOT_FOUND, "Post not found");
    }

    const newComment = await Comment.create(
      [{ ...payload, author: userId }],
      { session }
    );

    const commentCount = await Comment.countDocuments({
      postId: payload.postId,
    }).session(session);

    findPost.comments = commentCount;
    await findPost.save({ session });

    await session.commitTransaction();
    session.endSession();

    return newComment[0];
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};


const getCommentsWithReplies = async (postId: string) => {

    const findPost = await Post.findById(postId)
    if (!findPost) {
        throw new AppError(httpStatusCode.NOT_FOUND, "post not found")
    }

    const objectId = new mongoose.Types.ObjectId(postId);

    const comments = await Comment.aggregate([
        { $match: { postId: objectId } },

        //Lookup replies (parentId = _id)
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "parentId",
                as: "replies",
            },
        },

        // top-level comments (parentId = null)
        { $match: { parentId: null } },

        //Sort comments by newest first
        { $sort: { createdAt: -1 } },

        //Populate author info for comments
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author",
            },
        },
        {
            $unwind: "$author",
        },

        // Populate author info for replies
        {
            $unwind: { path: "$replies", preserveNullAndEmptyArrays: true },
        },
        {
            $lookup: {
                from: "users",
                localField: "replies.author",
                foreignField: "_id",
                as: "replies.author",
            },
        },
        {
            $unwind: { path: "$replies.author", preserveNullAndEmptyArrays: true },
        },
        {
            $group: {
                _id: "$_id",
                postId: { $first: "$postId" },
                parentId: { $first: "$parentId" },
                text: { $first: "$text" },
                likes: { $first: "$likes" },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "$updatedAt" },
                author: { $first: "$author" },
                replies: { $push: "$replies" },
            },
        },

        // sort replies by newest first
        {
            $addFields: {
                replies: {
                    $filter: {
                        input: "$replies",
                        as: "reply",
                        cond: { $ne: ["$$reply._id", null] },
                    },
                },
            },
        },
    ]);

    return comments;
};

export const CommentService = { addComment, getCommentsWithReplies }