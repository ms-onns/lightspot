import express, { Request, Response } from "express";
import cors from "cors";
import spotsRouter from "./routes/spots";
import authRouter from "./routes/auth";
import adminRouter from "./routes/admin";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "ok", message: "Server is running perfectly!" });
});

app.use("/api/spots", spotsRouter);
app.use("/api/admin", authRouter);
app.use("/api/admin", adminRouter);

export default app;
