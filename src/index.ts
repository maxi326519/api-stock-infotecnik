const app = require("./app");
import { conn } from "./db";
import { models } from "./db";
require("./db");

const PORT = process.env.PORT || 3001;

// Initialisation
conn.sync({ force: true }).then(async () => {
  console.log("Cargando datos");
  const config = await models.Configuration.findOne({ where: { id: 1 } });
  if (!config) await models.Configuration.create();

  const businessConfig = await models.BusinessConfig.findOne({
    where: { id: 1 },
  });
  if (!businessConfig) {
    await models.BusinessConfig.create({
      name: "MARC MARTIN SOLE",
      adress: " AV PAISOS CATALANS 80 17820, BANYOLES (GIRONA)",
    });
  }
  console.log("Datos cargando");

  app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
  });
});
