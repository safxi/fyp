import express from "express";
import {
  getMyNotifications,
  markAsRead,
} from "../controllers/notificationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getMyNotifications);
router.patch("/:id/read", markAsRead);

export default router;


