const app = require("./app");
import { conn } from "./db";
import { models } from "./db";
require("./db");

const PORT = process.env.PORT || 3001;

// Initialisation
conn.sync({ force: true }).then(async () => {
  const config = await models.Configuration.findOne({ where: { id: 1 } });
  if (!config) await models.Configuration.create();

  app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
  });
});
