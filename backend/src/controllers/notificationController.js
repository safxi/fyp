import { Notification } from "../models/Notification.js";

export const getMyNotifications = async (req, res, next) => {
  try {
    const items = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const item = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isRead: true },
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};


