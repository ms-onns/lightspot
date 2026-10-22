import { Router, Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest, verifyAdmin } from "../middleware/auth";

const router = Router();

router.get(
  "/dashboard-stats",
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

export default router;
