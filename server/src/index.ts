import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "./config/env";
import { prisma } from "./lib/prisma";
import { AuthRequest, verifyAdmin } from "./middleware/auth";

const app = express();
const PORT = env.PORT;

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

app.post("/api/spots", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, lat, lng, hasLight } = req.body;

    if (!name || lat === undefined || lng === undefined) {
      res
        .status(400)
        .json({ error: "Missing required fields: name, lat, lng" });
      return;
    }

    const newSpot = await prisma.spot.create({
      data: {
        name,
        lat,
        lng,
        hasLight: hasLight ?? false,
      },
    });

    res.status(201).json(newSpot);
  } catch (error) {
    console.error("Error creating spot:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post(
  "/api/admin/login",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email та пароль обов'язкові" });
        return;
      }

      const admin = await prisma.admin.findUnique({
        where: { email },
      });

      if (!admin) {
        res.status(401).json({ error: "Невірний логін або пароль" });
        return;
      }

      const isValidPassword = await bcrypt.compare(password, admin.password);

      if (!isValidPassword) {
        res.status(401).json({ error: "Невірний логін або пароль" });
        return;
      }

      const token = jwt.sign(
        { id: admin.id, email: admin.email },
        env.JWT_SECRET as string,
        { expiresIn: "12h" },
      );

      res.status(200).json({
        success: true,
        token,
        admin: { id: admin.id, email: admin.email },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

app.get(
  "/api/admin/dashboard-stats",
  verifyAdmin,
  async (req: AuthRequest, res: Response) => {
    try {
      const spotsCount = await prisma.spot.count();

      res.status(200).json({
        message: "Ласкаво просимо до секретної зони адміна!",
        stats: { totalSpots: spotsCount },
        adminData: req.admin,
      });
    } catch (error) {
      console.error("Dashboard error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
