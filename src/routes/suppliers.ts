import { Router } from "express";
import { Request, Response } from "express";
import {
  setSupplier,
  getSupplier,
  updateSupplier,
  deleteSupplier,
} from "./controllers/suppliers";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const supplier = req.body;
    const response = await setSupplier(supplier);
    res.status(200).json(response);
  } catch (err: any) {
    if (err.message.includes("missing parameter")) {
      res.status(404).json(err.message);
    } else {
      res.status(500).json(err.message);
    }
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await getSupplier();
    res.status(200).json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.patch("/", async (req: Request, res: Response) => {
  try {
    const supplier = req.body;
    await updateSupplier(supplier);
    res.status(200).json({ message: "Prveedor actualizado correctamente" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteSupplier(id);
    res
      .status(200)
      .json({ message: `El proveedor ${id} se elimino correctamente` });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
