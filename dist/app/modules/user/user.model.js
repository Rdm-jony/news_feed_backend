"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatarUrl: {
        type: String,
        default: null,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
UserSchema.index({ email: 1 });
exports.User = (0, mongoose_1.model)("User", UserSchema);
