const routerInv = require("express").Router();
const {
  setInvoices,
  getInvoices,
  updateInvoice,
  deleteInvoice,
} = require("./controllers/invoices");

routerInv.post("/", async (req: any, res: any) => {
  try{
    const invoice = req.body;
    const response = await setInvoices(invoice);
    res.status(200).json(response);
  }catch(err: any){
    console.log(err);
    res.status(400).json({ error: err.message });
  }
})

routerInv.get("/", async(req: any, res: any) => {
  try{
    const response = await getInvoices();
    console.log(response);
    res.status(200).json(response);
  }catch(err: any){
    res.status(400).json({ error: err.message });
  }
})

routerInv.patch("/", async (req: any, res: any) => {
  try{
    const newInvoice = req.body;
    await updateInvoice(newInvoice);
    res.status(200).json({ message: "Factura actualizada correctamente" });
  }catch(err){
    res.status(400).json({ error: err });
  }
})

/* routerInv.delete("/:id", async (req: any, res: any) => {
  try{
    const { id } = req.params;
    await deleteInvoice(id);
    res.status(200).json({ message: `La factura ${id} se elimino correctamente` });
  }catch(err){
    res.status(400).json({ error: err });
  }
}) */

module.exports = routerInv;
