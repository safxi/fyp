import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    case: { type: mongoose.Schema.Types.ObjectId, ref: "Case", required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    filePath: { type: String, required: true },
    fileName: { type: String, required: true },
    fileType: String,
    size: Number,
    category: {
      type: String,
      enum: ["PETITION", "EVIDENCE", "ORDER", "MISC"],
      default: "MISC",
    },
    summary: String,
    metadata: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

export const Document = mongoose.model("Document", documentSchema);


