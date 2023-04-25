import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

/* const { getInvoices } = require("./routes/controllers/invoices"); */

// Import routes
import login from "./routes/login";
import user from "./routes/users";
import uploads from "./routes/upload";
import products from "./routes/products";
import invoices from "./routes/invoices";
import inventory from "./routes/inventory";
import suppliers from "./routes/suppliers";
import clients from "./routes/clients";
import transactions from "./routes/transactions";
import configurations from "./routes/configurations";

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
server.use(express.static("upload"));
server.use(cors(corsOptions));
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

// Add routes
/* server.get("/invoice", async (req: any, res: any) => {
  try {
    const response = await getInvoices();
    res.status(200).json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}); */

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
