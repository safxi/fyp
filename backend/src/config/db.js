import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/ai_judiciary";
  try {
    await mongoose.connect(uri, {
      autoIndex: true,
    });
    // eslint-disable-next-line no-console
    console.log("MongoDB connected");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};


