import { ResultSetHeader, RowDataPacket } from "mysql2";
import { User, UserRegister } from "../@types/User.js";
import conn from "../config/db.js";


export async function findUserByEmail(email: string) {
    const [rows] = await conn.query<User[] & RowDataPacket[]>("SELECT * FROM users WHERE email = ?", [email]);

    return rows[0];
}

export async function createUser(user: UserRegister) {
    const [result] = await conn.query<ResultSetHeader>("INSERT INTO users SET ?", [user]);

    return result;
}

export async function findUserByDocument(document: string) {
    const [rows] = await conn.query<User[] & RowDataPacket[]>("SELECT * FROM users WHERE document = ?", [document]);

    return rows[0];
}

export async function modifyUser(document: string, user: Partial<User>) {
    const [result] = await conn.query<ResultSetHeader>("UPDATE users SET ? WHERE document = ?", [user, document]);

    return result;
}

export async function findUsers() {
    const [rows] = await conn.query<User[] & RowDataPacket[]>("SELECT * FROM users");

    return rows;
}

export async function deleteUser(document: string) {
    const [result] = await conn.query<ResultSetHeader>("DELETE FROM users WHERE document = ?", [document]);

    return result;
}