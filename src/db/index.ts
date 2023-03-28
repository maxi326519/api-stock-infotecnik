require("dotenv").config();
const pathDB = require("path");
const { Sequelize } = require("sequelize");
const { DataTypes } = require("sequelize");
const fs = require("fs");

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  PROD_DB_USER,
  PROD_DB_PASSWORD,
  PROD_DB_HOST,
  PROD_DB_PORT,
  PROD_DB_NAME,
} = process.env;

const options = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mariadb",
  logging: false,
  native: false,
};

const sequelize = new Sequelize(options);

const basename = pathDB.basename(__filename);

const modelDefiners: any = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(pathDB.join(__dirname, "/models"))
  .filter(
    (file: any) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      (file.slice(-3) === ".ts" || file.slice(-3) === ".js")
  )
  .forEach((file: any) => {
    modelDefiners.push(require(pathDB.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model: any) => model(sequelize, DataTypes));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Invoice, Product, Stock, Supplier, Images, Category } =
  sequelize.models;

Invoice.hasMany(Stock);
Stock.belongsTo(Invoice);

Product.hasMany(Stock);
Stock.belongsTo(Product);

Product.belongsTo(Category);
Category.hasMany(Product);

Supplier.hasMany(Invoice);
Invoice.belongsTo(Supplier);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
