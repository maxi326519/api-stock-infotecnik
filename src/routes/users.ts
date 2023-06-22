import { Router } from "express";
import { Request, Response } from "express";
import {
  setUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "./controllers/users";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const response = await setUser(user);
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

router.get("/", async (_, res: Response) => {
  try {
    const response = await getAllUsers();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/", async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    await updateUser(userData);
    res.status(200).json({ msg: "update user successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    await deleteUser(id);
    res.status(200).json({ msg: "deleted user successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
