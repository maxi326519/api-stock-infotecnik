const routerSup = require("express").Router();
const {
  setSupplier,
  getSupplier,
  updateSupplier,
  disabledSupplier,
} = require("./controllers/suppliers");

routerSup.post("/", async (req: any, res: any) => {
  try{
    const supplier = req.body;
    const response = await setSupplier(supplier);
    res.status(200).json(response);
  }catch(err: any){
    res.status(400).json({ error: err.message });
  }
})

routerSup.get("/", async (req: any, res: any) => {
  try{
    const response = await getSupplier();
    res.status(200).json(response);
  }catch(err: any){
    res.status(400).json({ error: err.message });
  }
})

routerSup.patch("/", async (req: any, res: any) => {
  try{
    const supplier = req.body;
    await updateSupplier(supplier);
    res.status(200).json({ message: "Prveedor actualizado correctamente" });
  }catch(err: any){
    res.status(400).json({ error: err.message });
  }
})

/* routerSup.delete("/:id", async (req: any, res: any) => {
  try{
    const { id } = req.params;
    await disabledSupplier(id);
    res.status(200).json({ message: `El proveedor ${id} se elimino correctamente` });
  }catch(err: any){
    res.status(400).json({ error: err.message });
  }
}) */

module.exports = routerSup;