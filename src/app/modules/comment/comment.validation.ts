import { z } from "zod";

export const createCommentSchema = z.object({
    postId: z
      .string().nonempty("post id is required"),

    text: z
      .string()
      .min(1, "Comment text cannot be empty")
      .max(500, "Comment text cannot exceed 500 characters"),

    parentId: z
      .string()
      .optional()
      .nullable(),
  
});


