const routeInventory = require("express").Router();
const {
  getInventory,
  updateInventory,
  disabledInventory,
} = require("./controllers/inventory");

routeInventory.get("/", async (req: any, res: any) => {
  try{
    const query = await getInventory();
    res.status(200).json(query);
  }catch(err: any){
    console.log(err);
    res.status(400).json({ error: err.message });
  }
})

routeInventory.patch("/", async (req: any, res: any) => {
  try{
    const stock = req.body;
    await updateInventory(stock);
    res.status(200).json({ message: `El stock ${stock.id} se actualizo correctamente` });
  }catch(err: any){
    console.log(err);
    res.status(400).json({ error: err.message });
  }
})

/* routeInventory.delete("/", (req: any, res: any) => {
  try{
    res.status(200).json({ msg: "delete inventory" });
  }catch(err: any){
    console.log(err);
    res.status(400).json({ error: err.message });
  }
}) */

module.exports = routeInventory;
