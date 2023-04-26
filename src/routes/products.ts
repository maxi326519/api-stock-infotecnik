import { Router } from "express";
import {
  setProducts,
  getProducts,
  updateProducts,
  deletedProduct,
  setCategories,
  setAttributes,
  getAttributes,
} from "./controllers/products";

const route = Router();

route.post("/", async (req: any, res: any) => {
  try {
    const product = req.body;
    const query = await setProducts(product);
    res.status(200).json(query);
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

route.get("/", async (req: any, res: any) => {
  try {
    const query = await getProducts();
    res.status(200).json(query);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

route.patch("/", async (req: any, res: any) => {
  try {
    const product = req.body;
    await updateProducts(product);
    res.status(200).json({ message: "Producto actualizado correctamente" });
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

route.delete("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    await deletedProduct(id);
    res
      .status(200)
      .json({ message: `El producto ${id} se elimino correctamente` });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

route.post("/categories", async (req: any, res: any) => {
  try {
    const data = req.body;
    await setCategories(data);
    res.status(200).json({ msg: "Saved categories successfully" });
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

route.post("/attributes/:name", async (req: any, res: any) => {
  try {
    const { name } = req.params;
    const data = req.body;
    console.log(data);
    const response = await setAttributes(name, data);
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

route.get("/attributes", async (req: any, res: any) => {
  try {
    const response = await getAttributes();
    res.status(200).json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default route;
