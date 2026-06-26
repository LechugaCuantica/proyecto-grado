import { Request, Response } from "express";
import { User, UserLogin, UserRegister } from "../@types/User.js";
import { createUser, deleteUser, findUserByDocument, findUserByEmail, findUsers, modifyUser } from "../model/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/env.js";

export async function validateLogin(req: Request, res: Response) {
    res.json({
        message: "Login validado"
    });
}

export async function login(req: Request<unknown, unknown, UserLogin>, res: Response<{ message: string, token?: string }>) {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);

        if (!user) return res.status(401).json({ message: "Credenciales incorrectas" });

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) return res.status(401).json({ message: "Credenciales incorrectas" });

        const token = jwt.sign({ document: user.document, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

        return res.status(200).json({
            message: "Login exitoso",
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al iniciar sesion"
        });
    }
}


export async function register(req: Request<unknown, unknown, UserRegister>, res: Response<{ message: string }>) {
    try {
        const { document, name, lastName, email, password, phone, address } = req.body;

        const user = await findUserByEmail(email);

        if (user) return res.status(400).json({ message: "El correo electrónico ya está registrado." });

        const salt = await bcrypt.genSalt(10);

        const newPassword = await bcrypt.hash(password, salt);

        const newUser = {
            document,
            name,
            lastName,
            email,
            password: newPassword,
            phone,
            address,
        };

        const result = await createUser(newUser);

        if (!result || result.affectedRows === 0) return res.status(500).json({
            message: "Error al registrar el usuario"
        });

        return res.status(201).json({
            message: "Usuario registrado exitosamente"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error al registrar el usuario"
        });
    }
}


export async function getUsers(req: Request, res: Response<{ message: string, users?: User[] }>) {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) return res.status(401).json({ message: "Acceso no autorizado." });

        const decoded = jwt.verify(token, SECRET_KEY) as { document: string, role: number };

        if (!decoded) return res.status(401).json({ message: "Acceso no autorizado." });

        const user = await findUserByDocument(decoded.document);

        if (!user) return res.status(401).json({ message: "Acceso no autorizado." });

        if (user.role !== 1) return res.status(401).json({ message: "Acceso no autorizado." });

        const users = await findUsers();

        return res.status(200).json({
            message: "Usuarios obtenidos exitosamente",
            users
        });
    } catch (error) {
        console.log(error);


        if (error instanceof jwt.JsonWebTokenError) {
            if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") return res.status(401).json({ message: "Acceso no autorizado." });
        }

        return res.status(500).json({
            message: "Error al obtener los usuarios"
        });
    }
}


export async function updateUsers(req: Request<{ document: string }, unknown, Partial<User>>, res: Response<{ message: string }>) {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) return res.status(401).json({ message: "Acceso no autorizado." });

        const decoded = jwt.verify(token, SECRET_KEY) as { document: string, role: number };

        if (!decoded) return res.status(401).json({ message: "Acceso no autorizado." });

        const user = await findUserByDocument(decoded.document);

        if (!user) return res.status(401).json({ message: "Acceso no autorizado." });

        if (user.role !== 1) return res.status(401).json({ message: "Acceso no autorizado." });

        const { document } = req.params;
        const { password } = req.body;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(password, salt);
            req.body.password = newPassword;
        }

        const result = await modifyUser(document, req.body);

        if (!result || result.affectedRows === 0) return res.status(500).json({
            message: "Error al actualizar el usuario"
        });

        return res.status(200).json({
            message: "Usuario actualizado exitosamente"
        });

    } catch (error) {
        console.log(error);


        if (error instanceof jwt.JsonWebTokenError) {
            if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") return res.status(401).json({ message: "Acceso no autorizado." });
        }

        return res.status(500).json({
            message: "Error al actualizar el usuario"
        });
    }

}


export async function deleteUserController(req: Request<{ document: string }>, res: Response<{ message: string }>) {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) return res.status(401).json({ message: "Acceso no autorizado." });

        const decoded = jwt.verify(token, SECRET_KEY) as { document: string, role: number };

        if (!decoded) return res.status(401).json({ message: "Acceso no autorizado." });

        const user = await findUserByDocument(decoded.document);

        if (!user) return res.status(401).json({ message: "Acceso no autorizado." });

        if (user.role !== 1) return res.status(401).json({ message: "Acceso no autorizado." });

        const { document } = req.params;

        const result = await deleteUser(document);

        if (!result || result.affectedRows === 0) return res.status(500).json({
            message: "Error al eliminar el usuario"
        });

        return res.status(200).json({
            message: "Usuario eliminado exitosamente"
        });

    } catch (error) {
        console.log(error);


        if (error instanceof jwt.JsonWebTokenError) {
            if (error.name === "TokenExpiredError") return res.status(401).json({ message: "Sesión expirada." });

            if (error.name === "JsonWebTokenError") return res.status(401).json({ message: "Acceso no autorizado." });

        }

        return res.status(500).json({
            message: "Error al eliminar el usuario"
        });

    }
}
