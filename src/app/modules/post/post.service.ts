import { QueryBuilder } from "../../utils/queryBuilder";
import { postSearChQueryFields } from "./post.constant";
import { IPost, IPrivacy } from "./post.interface";
import { Post } from "./post.model";

const createPost = async (payload: Partial<IPost>, userId: string) => {
    const newpost = await Post.create({ ...payload, author: userId })
    return newpost
};

const getAllPost = async (query: Record<string, string>, userId: string) => {
    const queryBuilder = new QueryBuilder(Post.find({
        $or: [
            { privacy: IPrivacy.PUBLIC },    // public posts
            { author: userId, privacy: IPrivacy.PRIVATE } // own private posts
        ],
    }), query)

    const getPosts = await queryBuilder
        .filter()
        .search(postSearChQueryFields)
        .sort()
        .fields()
        .paginate()
        .build().populate("author")
    const meta = await queryBuilder.getMeta()

    return {
        getPosts,
        meta
    }


}


export const toggleLikeOnPost = async (postId: string, userId: string) => {
    const isLiked = await Post.exists({ _id: postId, likes: userId });

    let updateQuery;

    if (isLiked) {
        updateQuery = { $pull: { likes: userId } };
    } else {
        updateQuery = { $addToSet: { likes: userId } };
    }

    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        updateQuery,
        { new: true }
    );

    return updatedPost;
};


const getLikedUsers = async (postId: string) => {
    const post = await Post.findById(postId)
        .select("likes")
        .populate("likes", "firstName lastName avatarUrl");
    if (!post) {
        throw new Error("Post not found");
    }

    return post.likes;
};




export const PostService = {
    toggleLikeOnPost,
    createPost,
    getAllPost,
    getLikedUsers
};
