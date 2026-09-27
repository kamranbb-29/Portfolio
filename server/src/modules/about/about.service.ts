import About from "./about.model";
import type { UpdateAboutData } from "./about.validation";

const getAbout = async () => {
  return await About.findOne({});
};

const updateAbout = async (data: UpdateAboutData) => {
  return await About.findOneAndUpdate({}, data, {
    new: true,
    upsert: true,
    runValidators: true,
  });
};

export default {
  getAbout,
  updateAbout,
};
