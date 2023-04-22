const { Invoice, InvoiceDestails, Supplier } = require("../../../db/index");
const { setInventory } = require("../inventory");

const setInvoices = async (invoice) => {
  /* Validations */
  if (!invoice.fecha) throw new Error("missing parameter (fecha)");
  if (invoice.numero === undefined)
    throw new Error("missing parameter (numero)");
  if (invoice.pendiente === undefined)
    throw new Error("missing parameter (numero)");
  if (!invoice.pendiente && !invoice.archivo)
    throw new Error("missing parameter (archivo)");
  if (!invoice.tipoImpositivo)
    throw new Error("missing parameter (tipoImpositivo)");
  if (!invoice.detalles) throw new Error("missing parameter (detalles)");
  if (!invoice.supplier) throw new Error("missing parameter (supplier)");
  if (invoice.detalles.length <= 0) throw new Error("No se adjunto inventario");

  if (invoice.numero !== "") {
    const invoiceRef = await Invoice.findOne({
      where: { numero: invoice.numero },
    });
    if (invoiceRef) throw new Error("numero already exist");
  }

  /* Search supplier */
  const supplierRef = await Supplier.findOne({
    where: { id: invoice.supplier },
  });
  if (!supplierRef) throw new Error("Supplier not found");

  /* Add Inventory stock */
  const inventory = await setInventory(invoice.detalles);

  /* Create invoice */
  const invoiceRef = await Invoice.create(invoice);

  /* Add invoice to supplier */
  const addinvoiceRef = await supplierRef.addInvoices(invoiceRef);

  /* Add Inventory to Invoice */
  await invoiceRef.addStocks(inventory.map((i) => i.ref));

  return {
    invoice: {
      ...invoiceRef.dataValues,
      SupplierId: addinvoiceRef.dataValues.id,
      StockId: inventory.map((i) => i.data.id),
    },
    inventory: [
      ...inventory.map((i) => {
        return {
          ...i.data,
          InvoiceId: invoiceRef.dataValues.id,
        };
      }),
    ],
  };
};

const setServiceInvoice = async (invoice) => {
  const newInvoice = await Invoice.create(invoice);
  let newDetails = [];

  for (let i = 0; i < invoice.InvoiceDetails.length; i++) {
    newDetails.push(await InvoiceDestails.create(invoice.InvoiceDetails[i]));
  }

  console.log(invoice.InvoiceDetails);
  console.log(newDetails);

  await newInvoice.setInvoiceDestails(newDetails);

  const invoiceReturn = await Invoice.findOne({
    where: { id: newInvoice.id },
    include: { model: InvoiceDestails },
  });

  return invoiceReturn;
};

const getInvoices = async () => {
  const response = await Invoice.findAll();
  return response;
};

const updateInvoice = async (invoice) => {
  const query = await Invoice.findOne({
    where: { id: invoice.id },
  });

  await query.update(invoice);
};

const disabledInvoice = async (invoiceId) => {
  await Invoice.destroy({ where: { id: invoiceId } });
};

module.exports = {
  setInvoices,
  setServiceInvoice,
  getInvoices,
  updateInvoice,
  disabledInvoice,
};
