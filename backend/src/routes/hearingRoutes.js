import express from "express";
import {
  createHearing,
  getHearingsForCalendar,
  rescheduleHearing,
} from "../controllers/hearingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createHearing);
router.get("/calendar", getHearingsForCalendar);
router.patch("/:id/reschedule", rescheduleHearing);

export default router;


