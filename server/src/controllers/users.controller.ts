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


export async function getUsers(req: Request, res: Response) {

    try {

        const users = await findUsers();

        return res.status(200).json({
            message: "Usuarios obtenidos",
            users
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Error al obtener usuarios"
        });

    }

}

export async function updateUsers(req, res) {

    try {

        const { document } = req.params;

        if(req.body.password){

            const salt = await bcrypt.genSalt(10);

            req.body.password = await bcrypt.hash(req.body.password,salt);

        }

        const result = await modifyUser(document,req.body);

        if(result.affectedRows===0){

            return res.status(404).json({
                message:"Usuario no encontrado"
            });

        }

        res.json({
            message:"Usuario actualizado"
        });

    }catch(error){

        console.log(error);

        res.status(500).json({
            message:"Error"
        });

    }

}

export async function deleteUserController(req,res){

    try{

        const {document}=req.params;

        const result=await deleteUser(document);

        if(result.affectedRows===0){

            return res.status(404).json({
                message:"Usuario no encontrado"
            });

        }

        res.json({
            message:"Usuario eliminado"
        });

    }catch(error){

        console.log(error);

        res.status(500).json({
            message:"Error"
        });

    }

}