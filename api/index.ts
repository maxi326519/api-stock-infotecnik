const express = require("express");
const router = require("express").Router();
const morgan = require("morgan");
const cors = require("cors");
const { conn } = require("./src/db")  ;
require("./src/db");

// Routes
const products = require("./src/routes/products");
const invoices = require("./src/routes/invoices");
const inventory = require("./src/routes/inventory");
const suppliers = require("./src/routes/suppliers");

// Initialisation
const app = express();
const PORT = process.env.PORT || 3000;


// Configurations
const corsOptions = {};
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));

// Routes
app.use("/products", products);
app.use("/invoices", invoices);
app.use("/inventory", inventory);
app.use("/suppliers", suppliers);

conn.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
  });
});
