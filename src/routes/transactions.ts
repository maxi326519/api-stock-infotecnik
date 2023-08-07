import { Router } from "express";
import { Request, Response } from "express";
import {
  setTransactions,
  getTransactions,
  deleteTransactions,
  bindTransactionToInvoiceFile,
  updateTransaction,
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
          .status(400)
          .json({ error: `missing parameter ${error.errors[0].path}` });
        break;
      default:
        res.status(400).json({ error: error.message });
        break;
    }
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const { from, to, linked } = req.query;
    if (
      typeof from === "string" &&
      typeof to === "string" &&
      (typeof linked === "string" || typeof linked === "undefined")
    ) {
      const response = await getTransactions(from, to, linked);
      res.status(200).json(response);
    } else {
      throw new Error("invalid querys");
    }
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

router.patch('/link', async (req, res) => {
  try {
    const { transactions, invoiceFile } = req.body;

    await bindTransactionToInvoiceFile(transactions, invoiceFile);

    res.status(200).json({ message: "Successfully linked transaction" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch('/', async (req: Request, res: Response) => {
  const data = req.body;

  try {
    await updateTransaction(data);
    res.status(200).json({ message: "Transaction updated successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
