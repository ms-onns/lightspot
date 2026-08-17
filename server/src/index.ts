import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "ok", message: "Server is running perfectly!" });
});

app.get("/api/spots", async (req: Request, res: Response) => {
  try {
    const spots = await prisma.spot.findMany();
    res.status(200).json(spots);
  } catch (error) {
    console.error("Error fetching spots:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
