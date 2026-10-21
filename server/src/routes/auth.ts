import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { prisma } from "../lib/prisma";

const router = Router();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
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
});

export default router;
