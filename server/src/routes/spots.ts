import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const spots = await prisma.spot.findMany();
    res.status(200).json(spots);
  } catch (error) {
    console.error("Error fetching spots:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
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

export default router;
