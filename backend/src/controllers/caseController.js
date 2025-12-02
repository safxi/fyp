import { Case } from "../models/Case.js";
import { CASE_STATUSES } from "../utils/constants.js";
import { generateCaseNumber } from "../services/caseNumberService.js";

export const createCase = async (req, res, next) => {
  try {
    const { title, caseType, description, clientId } = req.body;
    if (!title || !clientId) {
      return res.status(400).json({ message: "Title and clientId are required" });
    }

    const caseNumber = await generateCaseNumber();

    const newCase = await Case.create({
      caseNumber,
      title,
      caseType,
      description,
      client: clientId,
      advocate: req.user.role === "ADVOCATE" ? req.user._id : undefined,
      timeline: [
        {
          eventType: "CREATED",
          description: "Case created",
          createdBy: req.user._id,
        },
      ],
    });

    res.status(201).json(newCase);
  } catch (err) {
    next(err);
  }
};

export const getCases = async (req, res, next) => {
  try {
    const filter = {};

    if (req.user.role === "ADVOCATE") {
      filter.advocate = req.user._id;
    } else if (req.user.role === "CLIENT") {
      filter.client = req.user._id;
    } else if (req.user.role === "JUDGE") {
      filter.judge = req.user._id;
    }

    const cases = await Case.find(filter)
      .populate("client", "name email")
      .populate("advocate", "name email")
      .populate("judge", "name email")
      .sort({ createdAt: -1 });

    res.json(cases);
  } catch (err) {
    next(err);
  }
};

export const getCaseById = async (req, res, next) => {
  try {
    const item = await Case.findById(req.params.id)
      .populate("client", "name email")
      .populate("advocate", "name email")
      .populate("judge", "name email")
      .populate("documents");
    if (!item) {
      return res.status(404).json({ message: "Case not found" });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const updateCaseStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!Object.values(CASE_STATUSES).includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const item = await Case.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Case not found" });
    }

    item.status = status;
    item.timeline.push({
      eventType: "STATUS_CHANGED",
      description: `Status updated to ${status}`,
      createdBy: req.user._id,
    });

    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const assignAdvocate = async (req, res, next) => {
  try {
    const { advocateId } = req.body;
    const item = await Case.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Case not found" });
    }
    item.advocate = advocateId;
    item.timeline.push({
      eventType: "ADVOCATE_ASSIGNED",
      description: "Advocate assigned to case",
      createdBy: req.user._id,
    });
    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const assignJudge = async (req, res, next) => {
  try {
    const { judgeId } = req.body;
    const item = await Case.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Case not found" });
    }
    item.judge = judgeId;
    item.timeline.push({
      eventType: "JUDGE_ASSIGNED",
      description: "Judge assigned to case",
      createdBy: req.user._id,
    });
    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
};


