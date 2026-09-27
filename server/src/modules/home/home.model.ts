import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    resumeLink: {
      type: String,
      required: true,
    },
    educationSummary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Home = mongoose.model("Home", HomeSchema);
export default Home;
