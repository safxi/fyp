import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../src/models/User.js";
import { USER_ROLES, USER_STATUSES } from "../src/utils/constants.js";
import { connectDB } from "../src/config/db.js";

dotenv.config();

const SALT_ROUNDS = 10;

async function createAdmin() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    const email = process.argv[2] || "admin@judiciary.com";
    const password = process.argv[3] || "admin123";
    const name = process.argv[4] || "System Admin";

    // Check if admin already exists
    const existing = await User.findOne({ email });
    if (existing) {
      console.log(`❌ User with email ${email} already exists!`);
      process.exit(1);
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const admin = await User.create({
      name,
      email,
      passwordHash,
      role: USER_ROLES.ADMIN,
      status: USER_STATUSES.APPROVED, // Auto-approved
    });

    console.log("✅ Admin user created successfully!");
    console.log(`   Email: ${admin.email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   Status: ${admin.status}`);
    console.log("\n⚠️  Remember to change the password after first login!");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
}

createAdmin();

