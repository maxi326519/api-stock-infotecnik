const routerClient = require("express").Router();
const {
  setClient,
  getClient,
  updateClient,
  deleteClient,
} = require("./controllers/clients");

routerClient.post("/", async (req: any, res: any) => {
  try{
    const client = req.body;
    const response = await setClient(client);
    res.status(200).json(response);
  }catch(err: any){
    res.status(400).json({ error: err.message });
  }
})

routerClient.get("/", async (req: any, res: any) => {
  try{
    const response = await getClient();
    res.status(200).json(response);
  }catch(err: any){
    res.status(400).json({ error: err.message });
  }
})

routerClient.patch("/", async (req: any, res: any) => {
  try{
    const client = req.body;
    await updateClient(client);
    res.status(200).json({ message: "Client updated successfully" });
  }catch(err: any){
    res.status(400).json({ error: err.message });
  }
})

routerClient.delete("/:id", async (req: any, res: any) => {
  try{
    const { id } = req.params;
    console.log(id);
    await deleteClient(id);
    res.status(200).json({ message: `Removed client ${id} successfully` });
  }catch(err: any){
    console.log(err);
    res.status(400).json({ error: err.message });
  }
})

module.exports = routerClient;