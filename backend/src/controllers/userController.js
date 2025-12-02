import { User } from "../models/User.js";
import { USER_STATUSES } from "../utils/constants.js";

export const getPendingUsers = async (req, res, next) => {
  try {
    const users = await User.find({ status: USER_STATUSES.PENDING }).select(
      "-passwordHash"
    );
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!Object.values(USER_STATUSES).includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select("-passwordHash");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};


