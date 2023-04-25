import { Router } from "express";
import { Request, Response } from "express";
import {
  getConfiguration,
  updateConfiguration,
} from "./controllers/configurations";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  try {
    const response = await getConfiguration();
    res.status(200).json(response);
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

route.patch("/", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response = await updateConfiguration(data);
    res.status(200).json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default route;
