import { Router } from "express";
import { Request, Response } from "express";
import {
  setTransactions,
  getTransactions,
  deleteTransactions,
} from "./controllers/transactions";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response = await setTransactions(data);
    res.status(200).json(response);
  } catch (error: any) {
    switch (error.errors?.[0].type) {
      case "unique violation":
        res.status(400).send({ error: error.errors[0].message });
        break;
      case "notNull Violation":
        res
          .status(500)
          .json({ error: `missing parameter (${error.errors[0].path})` });
        break;
      default:
        res.status(500).json({ error: error.message });
        break;
    }
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await getTransactions();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteTransactions(id);
    res.status(200).json({ msg: `Product removed (${id})` });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
