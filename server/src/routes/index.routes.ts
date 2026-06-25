import { Router } from "express";
import { login, register, validateLogin } from "../controllers/users.controller.js";
import usersRoutes from "./dashboard.routes.js";
const router = Router();

router.get("/", validateLogin);
router.post("/login", login);
router.post("/register", register);

router.use("/dashboard", usersRoutes);;

export default router;