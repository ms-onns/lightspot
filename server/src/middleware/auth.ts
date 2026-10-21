import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthRequest extends Request {
  admin?: string | jwt.JwtPayload;
}

export const verifyAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      error: "Немає доступу. Токен відсутній або має невірний формат.",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET as string);

    req.admin = decoded;

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(403).json({ error: "Токен недійсний або прострочений." });
    return;
  }
};
