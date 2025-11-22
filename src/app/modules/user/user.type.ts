
export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatarUrl?: string | null;
    isActive: boolean;
}
