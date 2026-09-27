import Home from "./home.model";

import type { CreateHomeData, UpdateHomeData } from "./home.validation";

const getHome = async () => {
  const home = await Home.findOne({});

  return home;
};

const updateHome = async (data: UpdateHomeData) => {
  const home = await Home.findOneAndUpdate({}, data, {
    new: true,
    upsert: true,
    runValidators: true,
  });
  return home;
};

export default {
  getHome,
  updateHome,
};
