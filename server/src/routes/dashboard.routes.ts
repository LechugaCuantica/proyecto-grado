import { Router } from "express";
import { deleteUserController, getUsers, updateUsers } from "../controllers/users.controller.js";


const router = Router();

router.get("/users", getUsers);
// router.post("/users");

router.put("/users/:document", updateUsers);
router.delete("/users/:document", deleteUserController);

export default router;
