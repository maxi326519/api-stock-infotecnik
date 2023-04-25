import { Router } from "express";
import { Request, Response } from "express";
import {
  setClient,
  getClient,
  updateClient,
  deleteClient,
} from "./controllers/clients";

const route = Router();

route.post("/", async (req: Request, res: Response) => {
  try {
    const client = req.body;
    const response = await setClient(client);
    res.status(200).json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

route.get("/", async (req: Request, res: Response) => {
  try {
    const response = await getClient();
    res.status(200).json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

route.patch("/", async (req: Request, res: Response) => {
  try {
    const client = req.body;
    await updateClient(client);
    res.status(200).json({ message: "Client updated successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

route.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteClient(id);
    res.status(200).json({ message: `Removed client ${id} successfully` });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

export default route;
