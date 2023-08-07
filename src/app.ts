import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

// Import routes
import login from "./routes/login";
import user from "./routes/users";
import uploads from "./routes/upload";
import products from "./routes/products";
import invoices from "./routes/invoices";
import invoiceFile from "./routes/invoiceFile";
import sales from "./routes/sales";
import inventory from "./routes/inventory";
import suppliers from "./routes/suppliers";
import clients from "./routes/clients";
import transactions from "./routes/transactions";
import configurations from "./routes/configurations";

// Ceate app
const app = express();

// Cors options
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET, PATCH, POST, OPTIONS, PUT, DELETE",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
};

// app config
app.use(express.static("upload"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/login", login);
app.use("/user", user);
app.use("/upload", uploads);
app.use("/products", products);
app.use("/invoice", invoices);
app.use("/invoiceFile", invoiceFile);
app.use("/inventory", inventory);
app.use("/sales", sales);
app.use("/suppliers", suppliers);
app.use("/clients", clients);
app.use("/transactions", transactions);
app.use("/configurations", configurations);

// Implementar un protocolo de HTTPS de Security
// Error catching endware.
app.use((err: any, req: any, res: any, next: any) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
