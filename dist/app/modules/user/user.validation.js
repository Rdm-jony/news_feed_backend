"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, "First name is required"),
    lastName: zod_1.z
        .string()
        .min(1, "Last name is required"),
    email: zod_1.z
        .email("Invalid email address"),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters"),
    avatarUrl: zod_1.z.string().url().optional().nullable(),
    isActive: zod_1.z.boolean().optional().default(true),
});
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z
        .email("Invalid email address").min(1, "email is required"),
    password: zod_1.z
        .string()
        .min(1, "Password is required"),
});
