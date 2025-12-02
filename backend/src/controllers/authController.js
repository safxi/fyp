import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { USER_ROLES, USER_STATUSES } from "../utils/constants.js";
import { generateTokens } from "../utils/jwt.js";

const SALT_ROUNDS = 10;

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, profile } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!Object.values(USER_ROLES).includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      name,
      email,
      passwordHash,
      role,
      profile,
      status: USER_STATUSES.PENDING,
    });

    const safeUser = user.toObject();
    delete safeUser.passwordHash;

    return res.status(201).json({
      message: "Registration submitted. Awaiting admin approval.",
      user: safeUser,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.status !== USER_STATUSES.APPROVED) {
      return res
        .status(403)
        .json({ message: "Account not approved by admin yet" });
    }

    const tokens = generateTokens(user);
    const safeUser = user.toObject();
    delete safeUser.passwordHash;

    return res.json({
      user: safeUser,
      ...tokens,
    });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res) => {
  return res.json({ user: req.user });
};


