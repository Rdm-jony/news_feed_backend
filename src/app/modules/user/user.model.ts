import { model, Schema } from "mongoose";
import { IUser } from "./user.type";

const UserSchema = new Schema<IUser>(
    {
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
    },
    {
        timestamps: true,
    }
);

UserSchema.index({ email: 1 });
export const User = model<IUser>("User", UserSchema);
