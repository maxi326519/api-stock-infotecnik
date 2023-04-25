import { Router } from "express";
import { Request, Response } from "express";
import {
  setInvoices,
  setServiceInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice,
} from "./controllers/invoices";

const route = Router();

route.post("/", async (req: Request, res: Response) => {
  try {
    const invoice = req.body;
    const response = await setInvoices(invoice);
    res.status(200).json(response);
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

route.post("/services", async (req: Request, res: Response) => {
  try {
    const invoice = req.body;
    const response = await setServiceInvoice(invoice);
    res.status(200).json(response);
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

route.get("/", async (req: Request, res: Response) => {
  try {
    const response = await getInvoices();
    res.status(200).json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

route.patch("/", async (req: Request, res: Response) => {
  try {
    const newInvoice = req.body;
    await updateInvoice(newInvoice);
    res.status(200).json({ message: "Factura actualizada correctamente" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

route.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteInvoice(id);
    res
      .status(200)
      .json({ message: `La factura ${id} se elimino correctamente` });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

export default route;
