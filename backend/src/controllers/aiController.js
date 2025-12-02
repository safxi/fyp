import { Case } from "../models/Case.js";
import { summarizeText, generateDraft } from "../services/aiService.js";

export const createDraft = async (req, res, next) => {
  try {
    const { type, caseId, inputs } = req.body;
    if (!type) {
      return res.status(400).json({ message: "type is required" });
    }

    let caseContext = null;
    if (caseId) {
      caseContext = await Case.findById(caseId).lean();
    }

    const text = await generateDraft({ type, inputs, caseContext });
    res.json({ draft: text });
  } catch (err) {
    next(err);
  }
};

export const summarize = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "text is required" });
    }
    const summary = await summarizeText(text);
    res.json({ summary });
  } catch (err) {
    next(err);
  }
};


