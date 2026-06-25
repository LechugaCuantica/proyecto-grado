export interface User {
    document: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: number;
}

export type UserLogin = Pick<User, "email" | "password">;

export type UserRegister = Omit<User, "role">;