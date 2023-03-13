require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DataTypes } = require('sequelize');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

console.log(DB_USER, DB_PASSWORD, DB_HOST, DB_NAME);

const sequelize = new Sequelize(`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners: any = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file: any) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts'))
  .forEach((file: any) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model: any) => model(sequelize, DataTypes));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Invoice, Product, Stock, Supplier, Images, Category } = sequelize.models;

console.log(sequelize.models);

Invoice.hasMany(Stock);
Stock.belongsTo(Invoice);

Product.hasMany(Stock);
Stock.belongsTo(Product);

Product.hasMany(Images);
Images.belongsTo(Product);

Product.belongsTo(Category);
Category.hasMany(Product);

Stock.hasMany(Images);
Images.belongsTo(Stock);

Supplier.hasMany(Invoice);
Invoice.belongsTo(Supplier);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};