import express from "express";
import cors from "cors";
import projectRouter from "./modules/projects/project.router";
import skillRouter from "./modules/skills/skills.router";
import homeRouter from "./modules/home/home.router";
import aboutRouter from "./modules/about/about.router";
import adminRouter from "./modules/auth/admin.router";
import { centralisedErrHandler } from "./middleware/centralisedErrHandler";
import contactRoutes from "./modules/contact/contact.route";

import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/home", homeRouter);

app.use("/projects", projectRouter);
app.use("/skills", skillRouter);

app.use("/auth", adminRouter);
app.use("/about", aboutRouter);
app.use("/api/contact", contactRoutes);

app.use(centralisedErrHandler);

export default app;
