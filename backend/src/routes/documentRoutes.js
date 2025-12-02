import express from "express";
import { uploadDocument, getDocumentsForCase } from "../controllers/documentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { uploadSingle } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/upload", uploadSingle, uploadDocument);
router.get("/case/:caseId", getDocumentsForCase);

export default router;


