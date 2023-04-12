const app = require("./app");
const { conn } = require("./db");
const models = require("./db/index");
require("./db");

// Initialisation
const PORT = process.env.PORT || 3001;

conn.sync({ force: true }).then(() => {
  
  models.Configuration.create();

  app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
  });
});