import express from "express";
import {
  assignAdvocate,
  assignJudge,
  createCase,
  getCaseById,
  getCases,
  updateCaseStatus,
} from "../controllers/caseController.js";
import { authMiddleware, requireRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", requireRoles(["ADVOCATE", "STAFF", "ADMIN"]), createCase);
router.get("/", getCases);
router.get("/:id", getCaseById);
router.patch("/:id/status", requireRoles(["JUDGE", "ADMIN"]), updateCaseStatus);
router.patch("/:id/assign-advocate", requireRoles(["ADMIN", "STAFF"]), assignAdvocate);
router.patch("/:id/assign-judge", requireRoles(["ADMIN", "STAFF"]), assignJudge);

export default router;


