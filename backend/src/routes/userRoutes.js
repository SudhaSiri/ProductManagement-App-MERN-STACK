import express from "express";
import { registerUser, loginUser, getAllUsers, updateUserRole } from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import { allowRoles } from "../middleware/role.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin-only Routes
router.get("/all", auth, allowRoles("admin"), getAllUsers);
router.put("/update-role/:id", auth, allowRoles("admin"), updateUserRole);

export default router;
