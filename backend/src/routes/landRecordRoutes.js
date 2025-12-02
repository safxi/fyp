import express from "express";
import { searchLandRecords } from "../controllers/landRecordController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/search", searchLandRecords);

export default router;


