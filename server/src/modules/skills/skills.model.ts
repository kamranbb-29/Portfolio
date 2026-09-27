import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Technical", "Non-Technical"],
      required: true,
    },
    proficiency: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Skill = mongoose.model("Skill", skillSchema);
