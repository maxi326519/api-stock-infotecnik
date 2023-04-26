import { Router } from "express";
import { Request, Response } from "express";
import {
  setInvoices,
  setServiceInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice,
  getTypes,
  setTypes,
} from "./controllers/invoices";

const route = Router();

route.post("/", async (req: Request, res: Response) => {
  try {
    const invoice = req.body;
    const response = await setInvoices(invoice);
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

route.post("/services", async (req: Request, res: Response) => {
  try {
    const invoice = req.body;
    const response = await setServiceInvoice(invoice);
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

route.post("/types", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response = await setTypes(data);
    console.log("Set:", response);
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

route.get("/", async (req: Request, res: Response) => {
  try {
    const response = await getInvoices();
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

route.get("/types", async (req: Request, res: Response) => {
  try {
    const response = await getTypes();
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
