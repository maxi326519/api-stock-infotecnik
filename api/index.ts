const express = require("express");
const cors = require("cors");
const { conn } = require("./src/db")  ;
require("./src/db");

// Routes
const products = require("./src/routes/products");

// Initialisation
const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {};

app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/products", products);

conn.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
  });
});
