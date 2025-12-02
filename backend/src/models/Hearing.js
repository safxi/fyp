import mongoose from "mongoose";
import { HEARING_STATUSES } from "../utils/constants.js";

const rescheduleSchema = new mongoose.Schema(
  {
    from: Date,
    to: Date,
    reason: String,
  },
  { _id: false }
);

const hearingSchema = new mongoose.Schema(
  {
    case: { type: mongoose.Schema.Types.ObjectId, ref: "Case", required: true },
    judge: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    advocate: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    scheduledAt: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(HEARING_STATUSES),
      default: HEARING_STATUSES.SCHEDULED,
    },
    remarks: String,
    rescheduleHistory: [rescheduleSchema],
  },
  {
    timestamps: true,
  }
);

export const Hearing = mongoose.model("Hearing", hearingSchema);


