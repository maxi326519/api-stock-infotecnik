import { Router } from "express";
import { Request, Response } from "express";
import { getInventory, updateInventory } from "./controllers/inventory";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  try {
    const query = await getInventory();
    res.status(200).json(query);
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

route.patch("/", async (req: Request, res: Response) => {
  try {
    const stock = req.body;
    await updateInventory(stock);
    res
      .status(200)
      .json({ message: `El stock ${stock.id} se actualizo correctamente` });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

export default route;
