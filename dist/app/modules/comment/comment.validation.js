"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentSchema = void 0;
const zod_1 = require("zod");
exports.createCommentSchema = zod_1.z.object({
    postId: zod_1.z
        .string().nonempty("post id is required"),
    text: zod_1.z
        .string()
        .min(1, "Comment text cannot be empty")
        .max(500, "Comment text cannot exceed 500 characters"),
    parentId: zod_1.z
        .string()
        .optional()
        .nullable(),
});
