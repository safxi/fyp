import mongoose from "mongoose";
import { USER_ROLES, USER_STATUSES } from "../utils/constants.js";

const profileSchema = new mongoose.Schema(
  {
    cnic: String,
    barNumber: String,
    courtName: String,
    contactNumber: String,
    address: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(USER_STATUSES),
      default: USER_STATUSES.PENDING,
    },
    profile: profileSchema,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);


