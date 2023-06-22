const app = require("./app");
import { conn } from "./db";
import { models } from "./db";
import { generateInvoicePDF } from "./services/pdf";
require("./db");

const PORT = process.env.PORT || 3001;

// Initialisation
conn.sync({ force: false }).then(async () => {
  const config = await models.Configuration.findOne({ where: { id: 1 } });
  if (!config) await models.Configuration.create();

  const businessConfig = await models.BusinessConfig.findOne({
    where: { id: 1 },
  });
  if (!businessConfig) {
    await models.BusinessConfig.create({
      name: "MARC MARTIN SOLE",
      adress: " AV PAISOS CATALANS 80 17820, BANYOLES (GIRONA)",
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
  });
});


const invoiceData = {
  invoiceNumber: 'INV-001',
  date: '18 de Mayo de 2023',
  items: [
    {
      description: 'Producto 1',
      quantity: 2,
      price: 10,
    },
    {
      description: 'Producto 2',
      quantity: 1,
      price: 20,
    },
    {
      description: 'Producto 3',
      quantity: 3,
      price: 15,
    },
  ],
};

// Llama a la función para generar la factura PDF
const pdfURL = generateInvoicePDF(invoiceData);

console.log('Factura generada en:', pdfURL);