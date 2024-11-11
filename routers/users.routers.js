import { Router } from "express";
import { register, login, getAllUsers } from "../controllers/users.controllers.js";

const router = Router();


router.post("/register", register);
router.post("/login", login);
router.get("/users", getAllUsers);





export default router;

