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
        .build()
    const meta = await queryBuilder.getMeta()

    return {
        getPosts,
        meta
    }


}

export const PostService = {
    createPost,
    getAllPost
};
