const app = require("./app");
const { conn } = require("./db");
require("./db");

// Initialisation
const PORT = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
  });
});
