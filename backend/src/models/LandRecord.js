import mongoose from "mongoose";

const landRecordSchema = new mongoose.Schema(
  {
    cnic: { type: String, index: true },
    ownerName: String,
    plotNumber: { type: String, index: true },
    khasraNumber: String,
    area: String,
    location: String,
    registryNumber: String,
    recordDate: Date,
    linkedCases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Case" }],
  },
  {
    timestamps: true,
  }
);

export const LandRecord = mongoose.model("LandRecord", landRecordSchema);


