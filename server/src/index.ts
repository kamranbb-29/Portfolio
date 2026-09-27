import "dotenv/config";

import app from "./app";
import connectDB from "./config/database";
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};
startServer();
