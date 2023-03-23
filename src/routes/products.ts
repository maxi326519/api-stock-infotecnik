const routerPro = require("express").Router();
const {
  setProducts,
  getProducts,
  updateProducts,
  disabledProduct,
} = require("./controllers/products");


routerPro.post("/", async (req: any, res: any) => {
  try {
    const product = req.body;
    const query = await setProducts(product);
    res.status(200).json(query);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

routerPro.get("/", async (req: any, res: any) => {
  try {
    const query = await getProducts();
    res.status(200).json(query);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

routerPro.patch("/", async (req: any, res: any) => {
  try {
    const product = req.body;
    await updateProducts(product);
    res.status(200).json({ message: "Producto actualizado correctamente" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/* routerPro.delete("/:id", (req: any, res: any) => {
  try {
    const { id } = req.params;
    disabledProduct(id);
    res.status(200).json({ message: `El producto ${id} se elimino correctamente` });
  } catch (error) {
    res.status(400).json({ error: error });
  }
}); */

module.exports = routerPro;