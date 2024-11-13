import { Router } from "express";
import { register, login, getAllUsers, profile, updateUserVet } from "../controllers/users.controllers.js";
import { verifyToken , isAdmin} from "../middlewares/jwt.middlewares.js";

const router = Router();


router.post("/register", register);
router.post("/login", login);
router.get("/users", getAllUsers);
router.get("/profile",verifyToken,profile);
router.get("/allUsers", [verifyToken,isAdmin],getAllUsers);
router.put("/updateUserVet/:uid", [verifyToken,isAdmin],updateUserVet);





export default router;

