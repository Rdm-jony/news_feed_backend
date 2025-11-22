import { IReply } from "../reply/reply.interface";

export interface IComment {
    _id?: string;
    author: string;        
    text: string;
    likes: string[];       
    replies: IReply[];
}
