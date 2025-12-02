import express from "express";
import { getPendingUsers, updateUserStatus } from "../controllers/userController.js";
import { authMiddleware, requireRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware, requireRoles(["ADMIN"]));

router.get("/pending", getPendingUsers);
router.patch("/:id/status", updateUserStatus);

export default router;


