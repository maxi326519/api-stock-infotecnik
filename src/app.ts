const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const keys = require("./settings/keys");
const { serialize } = require("cookie");

const { getInvoices } = require("./routes/controllers/invoices");

// Import routes
const login = require("./routes/login").routerLogin;
const user = require("./routes/users");
const uploads = require("./routes/upload");
const products = require("./routes/products");
const invoices = require("./routes/invoices");
const inventory = require("./routes/inventory");
const suppliers = require("./routes/suppliers");
const clients = require("./routes/clients");
const transactions = require("./routes/transactions");
const configurations = require("./routes/configurations");

// Ceate server
const server = express();

// Cors options
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET, PATCH, POST, OPTIONS, PUT, DELETE",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
};

// server config
server.set("key", keys.key);
server.use(express.static("upload"));
server.use(cors(corsOptions));
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

// Add routes
server.get("/invoice", async (req: any, res: any) => {
  try {
    const response = await getInvoices();
    res.status(200).json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

server.use("/login", login);
server.use("/user", user);
server.use("/upload", uploads);
server.use("/products", products);
server.use("/invoices", invoices);
server.use("/inventory", inventory);
server.use("/suppliers", suppliers);
server.use("/clients", clients);
server.use("/transactions", transactions);
server.use("/configurations", configurations);

// Implementar un protocolo de HTTPS de Security
// Error catching endware.
server.use((err: any, req: any, res: any, next: any) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
