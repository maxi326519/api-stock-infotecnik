import { Router } from "express";
import { Request, Response } from "express";
import {
  setSale,
  getSales,
  updateSaleInvoice,
  updateSaleItem,
  deleteSaleInvoice,
  deleteSaleItem,
  rectifyingSaleInvoice,
  deleteRectifyingSaleInvoice,
} from "./controllers/sales";

const route = Router();

route.post("/", async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const response = await setSale(body);
    res.status(200).json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

route.get("/", async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;
    if (typeof from === "string" && typeof to === "string") {
      const response = await getSales(from, to);
      res.status(200).json(response);
    } else {
      throw new Error("invalid querys");
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

route.patch("/invoice/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await updateSaleInvoice(id);
    res.status(200).json({ msg: "invoice updated successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

route.patch("/item/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await updateSaleItem(id);
    res.status(200).json({ msg: "item updated successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

route.delete("/invoice/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await deleteSaleInvoice(id);
    res.status(200).json({ msg: "item deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

route.delete("/item/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await deleteSaleItem(id);
    res.status(200).json({ msg: "item deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

route.patch('/rectify', async (req, res) => {
  const { saleId } = req.body;

  const pdfUrl = await rectifyingSaleInvoice(saleId);

  if (pdfUrl === null) {
    return res.status(404).json({ error: 'SaleInvoice not found' });
  }
  return res.json({ rectifyPdfUrl: pdfUrl });
});

route.delete('/rectify/:saleId', async (req, res) => {
  const { saleId } = req.params;
  try {
    await deleteRectifyingSaleInvoice(saleId);
    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default route;
