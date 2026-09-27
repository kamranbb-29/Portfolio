import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    startYear: { type: Number, required: true },
    endYear: { type: Number },
    description: { type: String },
  },
  { _id: true },
);

const experienceSchema = new mongoose.Schema(
  {
    organization: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    description: { type: String, required: true },
  },
  { _id: true },
);

const aboutSchema = new mongoose.Schema(
  {
    biography: {
      type: String,
      required: true,
    },

    interests: {
      type: [String],
      default: [],
    },

    goals: {
      type: [String],
      default: [],
    },

    education: {
      type: [educationSchema],
      default: [],
    },

    experience: {
      type: [experienceSchema],
      default: [],
    },
  },
  { timestamps: true },
);

const About = mongoose.model("About", aboutSchema);

export default About;
