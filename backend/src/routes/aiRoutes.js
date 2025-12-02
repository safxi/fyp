import express from "express";
import { createDraft, summarize } from "../controllers/aiController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/draft", createDraft);
router.post("/summarize", summarize);

export default router;


