const routerConfig = require("express").Router();
const {
  getConfiguration,
  updateConfiguration,
} = require("./controllers/configurations");

routerConfig.get("/", async (req: any, res: any) => {
  try {
    const response = await getConfiguration();
    res.status(200).json(response);
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

routerConfig.patch("/", async (req: any, res: any) => {
  try {
    const data = req.body;
    const response = await updateConfiguration(data);
    res.status(200).json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = routerConfig;