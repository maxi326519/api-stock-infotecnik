require("dotenv").config();
import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const options: any = {
  dialect: "mariadb",
  host: DB_HOST,
  post: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: false,
  native: false,
  dialectOptions: {
    allowPublicKeyRetrieval: true,
  },
};

const sequelize = new Sequelize(options);

const basename = path.basename(__filename);

// Leer todos los archivos de la carpeta models y agregarlos al arreglo modelDefiners
const modelDefiners: Array<(sequelize: any, DataTypes: any) => void> = [];
fs.readdirSync(__dirname + "/models")
  /*   .map((file) => {
    console.log("File:", file);
    return file;
  }) */
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      (file.slice(-3) === ".ts" || file.slice(-3) === ".js")
  )
  .forEach((file) => {
    const modelDefiner = require(path.join(__dirname + "/models", file)).model;
    modelDefiners.push(modelDefiner);
  });

// Agregar todos los modelos definidos al objeto sequelize.models
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize, DataTypes);
}

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
export const {
  Invoice,
  InvoiceType,
  TotalDetail,
  Product,
  Stock,
  Supplier,
  Image,
  Category,
  Transaction,
  Client,
  Configuration,
  BusinessConfig,
  Capacity,
  Color,
  Marca,
  User,
  SaleInvoice,
  SaleDetail,
} = sequelize.models;

SaleInvoice.hasMany(SaleDetail);
SaleDetail.belongsTo(SaleInvoice);

Stock.hasMany(SaleDetail);
SaleDetail.belongsTo(Stock);

Product.hasMany(SaleDetail);
SaleDetail.belongsTo(Product);

Invoice.hasMany(Stock);
Stock.belongsTo(Invoice);

Invoice.hasMany(TotalDetail);
TotalDetail.belongsTo(Invoice);

Supplier.hasMany(Invoice);
Invoice.belongsTo(Supplier);

Supplier.hasMany(Stock);
Stock.belongsTo(Supplier);

Stock.hasMany(Image);
Image.belongsTo(Stock);

Product.hasMany(Stock);
Stock.belongsTo(Product);

Product.belongsTo(Category);
Category.hasMany(Product);

Product.hasMany(Image);
Image.belongsTo(Product);

export const conn = sequelize;
export const models = sequelize.models;
