import { IPost } from "./post.interface";
import { Post } from "./post.model";

const createPost = async (payload: Partial<IPost>, userId: string) => {
    const newpost = await Post.create({ ...payload, author: userId })
    return newpost
};

export const PostService = {
    createPost,
};
