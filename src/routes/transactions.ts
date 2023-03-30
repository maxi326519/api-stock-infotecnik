const routerTransactions = require("express").Router();
const {
  setTransactions,
  getTransactions,
  deleteTransactions,
} = require("./controllers/transactions");

routerTransactions.post("/", async (req: any, res: any) => {
  try {
    const data = req.body;
    const response = await setTransactions(data);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

routerTransactions.get("/", async (req: any, res: any) => {
  try {
    const response = await getTransactions();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

routerTransactions.delete("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    await deleteTransactions(id);
    res.status(200).json({ msg: `Product removed (${id})` });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = routerTransactions;
