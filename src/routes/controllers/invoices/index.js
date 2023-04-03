const { Invoice, Supplier, Stock } = require("../../../db/index");
const { setInventory } = require("../inventory");

const setInvoices = async (invoice) => {
  if (!invoice.fecha) throw new Error("Falta el parametro 'fecha'");
  if (!invoice.numero) throw new Error("Falta el parametro 'numero'");
  if (!invoice.pendiente && !invoice.archivo)
    throw new Error("Falta el parametro 'archivo'");
  if (!invoice.tipoImpositivo)
    throw new Error("Falta el parametro 'tipoImpositivo'");
  if (!invoice.detalles) throw new Error("Falta el parametro 'detalles'");
  if (!invoice.supplier) throw new Error("Falta el parametro 'supplier'");
  if (invoice.detalles.length <= 0) throw new Error("No se adjunto inventario");

  /* Search supplier */
  const supplierRef = await Supplier.findOne({
    where: { id: invoice.supplier },
  });
  if (!supplierRef) throw new Error("No se encontro al Proveedor");

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
    },
    inventory: {
      ...inventory.map((i) => {
        return {
          ...i.data,
          InvoiceId: invoiceRef.dataValues.id,
        };
      }),
    },
  };
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
  getInvoices,
  updateInvoice,
  disabledInvoice,
};
