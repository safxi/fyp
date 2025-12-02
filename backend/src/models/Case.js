import mongoose from "mongoose";
import { CASE_STATUSES } from "../utils/constants.js";

const caseTimelineSchema = new mongoose.Schema(
  {
    eventType: String,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const caseSchema = new mongoose.Schema(
  {
    caseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    caseType: String,
    description: String,
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    advocate: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    judge: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: Object.values(CASE_STATUSES),
      default: CASE_STATUSES.FILED,
    },
    filedDate: { type: Date, default: Date.now },
    court: String,
    nextHearingDate: Date,
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
    timeline: [caseTimelineSchema],
  },
  {
    timestamps: true,
  }
);

export const Case = mongoose.model("Case", caseSchema);


