import { Hearing } from "../models/Hearing.js";
import { HEARING_STATUSES } from "../utils/constants.js";

// Simple conflict check: same judge & overlapping datetime (same hour)
const hasConflict = async (judgeId, scheduledAt) => {
  const start = new Date(scheduledAt);
  const end = new Date(scheduledAt);
  end.setHours(end.getHours() + 1);

  const existing = await Hearing.findOne({
    judge: judgeId,
    scheduledAt: { $gte: start, $lt: end },
    status: HEARING_STATUSES.SCHEDULED,
  });
  return !!existing;
};

export const createHearing = async (req, res, next) => {
  try {
    const { caseId, judgeId, scheduledAt, remarks } = req.body;
    if (!caseId || !judgeId || !scheduledAt) {
      return res
        .status(400)
        .json({ message: "caseId, judgeId and scheduledAt are required" });
    }

    const conflict = await hasConflict(judgeId, scheduledAt);
    if (conflict) {
      return res
        .status(409)
        .json({ message: "Judge has another hearing at this time" });
    }

    const hearing = await Hearing.create({
      case: caseId,
      judge: judgeId,
      advocate: req.user.role === "ADVOCATE" ? req.user._id : undefined,
      scheduledAt,
      remarks,
    });

    res.status(201).json(hearing);
  } catch (err) {
    next(err);
  }
};

export const getHearingsForCalendar = async (req, res, next) => {
  try {
    const filter = {};
    if (req.user.role === "JUDGE") {
      filter.judge = req.user._id;
    } else if (req.user.role === "ADVOCATE") {
      filter.advocate = req.user._id;
    } else if (req.user.role === "CLIENT") {
      filter.client = req.user._id;
    }

    const hearings = await Hearing.find(filter)
      .populate("case", "caseNumber title")
      .populate("judge", "name")
      .sort({ scheduledAt: 1 });

    res.json(hearings);
  } catch (err) {
    next(err);
  }
};

export const rescheduleHearing = async (req, res, next) => {
  try {
    const { scheduledAt, reason } = req.body;
    if (!scheduledAt) {
      return res.status(400).json({ message: "scheduledAt is required" });
    }

    const hearing = await Hearing.findById(req.params.id);
    if (!hearing) {
      return res.status(404).json({ message: "Hearing not found" });
    }

    const conflict = await hasConflict(hearing.judge, scheduledAt);
    if (conflict) {
      return res
        .status(409)
        .json({ message: "Judge has another hearing at this time" });
    }

    hearing.rescheduleHistory.push({
      from: hearing.scheduledAt,
      to: scheduledAt,
      reason,
    });
    hearing.scheduledAt = scheduledAt;
    await hearing.save();

    res.json(hearing);
  } catch (err) {
    next(err);
  }
};


