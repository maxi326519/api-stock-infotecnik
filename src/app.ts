const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const sharp = require("sharp");
const jwt = require("jsonwebtoken");
const keys = require("./settings/keys");
const { serialize } = require("cookie");

// Import routes
const products = require("./routes/products");
const invoices = require("./routes/invoices");
const inventory = require("./routes/inventory");
const suppliers = require("./routes/suppliers");

// Ceate server
const server = express();

// Create storage
const helperImg = (filePath: string, fileName: string, size = 300) => {
  return sharp(filePath)
    .resize(size)
    .toFile(`/optimize/${fileName}.png`)
}

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "./src/upload")
  },
  filename: (req: any, file: any, cb: any) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${ext}`);
  }
})

const upload = multer({ storage });

server.use(express.static(path.join(__dirname, "upload")))
server.post("/upload", upload.single("file"), (req: any, res: any) => {
/*   helperImg(req.file.path, `resize-${req.file.filename}`, 100); */
  res.send({ data: "Imagen cargada"});
})

// server config
server.set("key", keys.key);
server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", /* "http://localhost:3000" */ '*'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Add routes
server.use("/products", products);
server.use("/invoices", invoices);
server.use("/inventory", inventory);
server.use("/suppliers", suppliers);

server.post("/login", (req: any, res: any) => {
  const {email, password} = req.body;

  if(email === "maxi.326519@gmail.com" && password === "12345678"){
    const token = jwt.sign({ check: true, email: "maxi.326519@gmail.com" }, server.get("key"), {
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 24,      
    });

    res.cookie("my-cookie", token);
    res.status(200).json({ mensage: "Login successfully"});
  }else{
    res.status(400).json({ error: "invalid credentials"});
  }
});

const verification = express.Router();

verification.use((req: any, res: any, next: any) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]
  if(!token){
    res.status(400).send({ error: "missin token" })
  }else{
    token = token.split(" ")[1];
    jwt.verify(token, server.get("key"), (error: any, decoded: any) => {
      if(error){
        return res.json({ message: "token invalid" })
      }else{
        req.decoded = decoded;
        next();
      }
    })
  }
})

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
