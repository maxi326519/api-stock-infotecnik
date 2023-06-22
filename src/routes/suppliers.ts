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
