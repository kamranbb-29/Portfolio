import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Admin from "./admin.model";
import connectDB from "../../config/database";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error(
        "Admin email or password not defined in environment variables",
      );
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await Admin.create({ email, passwordHash });
  } catch (err) {
    console.log(err);
  } finally {
    await mongoose.disconnect();
  }
};

seedAdmin();
