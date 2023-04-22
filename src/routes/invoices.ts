const routerInvoice = require("express").Router();
const {
  setInvoices,
  setServiceInvoice,
  updateInvoice,
  deleteInvoice,
} = require("./controllers/invoices");

routerInvoice.post("/", async (req: any, res: any) => {
  try {
    const invoice = req.body;
    const response = await setInvoices(invoice);
    res.status(200).json(response);
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

routerInvoice.post("/services", async (req: any, res: any) => {
  try {
    const invoice = req.body;
    const response = await setServiceInvoice(invoice);
    res.status(200).json(response);
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

/* routerInvoice.get("/", async (req: any, res: any) => {
  try {
    const response = await getInvoices();
    res.status(200).json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}); */

routerInvoice.patch("/", async (req: any, res: any) => {
  try {
    const newInvoice = req.body;
    await updateInvoice(newInvoice);
    res.status(200).json({ message: "Factura actualizada correctamente" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

routerInvoice.delete("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    await deleteInvoice(id);
    res
      .status(200)
      .json({ message: `La factura ${id} se elimino correctamente` });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = routerInvoice;
