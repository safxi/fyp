import fs from "fs";
import { Document } from "../models/Document.js";
import { summarizeText } from "../services/aiService.js";

export const uploadDocument = async (req, res, next) => {
  try {
    const { caseId, category } = req.body;
    if (!caseId || !req.file) {
      return res.status(400).json({ message: "caseId and file are required" });
    }

    let summary = "";
    try {
      const fileText = fs.readFileSync(req.file.path, "utf8");
      summary = await summarizeText(fileText);
    } catch {
      summary = "";
    }

    const doc = await Document.create({
      case: caseId,
      uploadedBy: req.user._id,
      filePath: req.file.path,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      size: req.file.size,
      category,
      summary,
    });

    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

export const getDocumentsForCase = async (req, res, next) => {
  try {
    const docs = await Document.find({ case: req.params.caseId }).sort({
      createdAt: -1,
    });
    res.json(docs);
  } catch (err) {
    next(err);
  }
};


