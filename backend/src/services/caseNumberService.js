import { Case } from "../models/Case.js";

// Simple incremental case number generator: YEAR-SEQ padded to 5 digits
export const generateCaseNumber = async () => {
  const year = new Date().getFullYear();
  const prefix = `${year}-`;

  const lastCase = await Case.findOne({ caseNumber: new RegExp(`^${prefix}`) })
    .sort({ caseNumber: -1 })
    .lean();

  let nextSeq = 1;
  if (lastCase && lastCase.caseNumber) {
    const parts = lastCase.caseNumber.split("-");
    const lastSeq = parseInt(parts[1], 10);
    if (!Number.isNaN(lastSeq)) {
      nextSeq = lastSeq + 1;
    }
  }

  const padded = String(nextSeq).padStart(5, "0");
  return `${prefix}${padded}`;
};


