import { LandRecord } from "../models/LandRecord.js";

export const searchLandRecords = async (req, res, next) => {
  try {
    const { cnic, plotNumber } = req.query;
    const filter = {};

    if (cnic) filter.cnic = cnic;
    if (plotNumber) filter.plotNumber = plotNumber;

    if (Object.keys(filter).length === 0) {
      return res
        .status(400)
        .json({ message: "Provide at least cnic or plotNumber" });
    }

    const records = await LandRecord.find(filter).populate("linkedCases", "caseNumber title");
    res.json(records);
  } catch (err) {
    next(err);
  }
};


