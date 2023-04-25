import { Invoice, TotalDestail, Supplier } from "../../../db/index";
import { setInventory } from "../inventory";

const setInvoices = async (invoice: any) => {
  /* Validations */
  if (!invoice.fecha) throw new Error("missing parameter (fecha)");
  if (invoice.numero === undefined)
    throw new Error("missing parameter (numero)");
  if (invoice.total === undefined) throw new Error("missing parameter (total)");
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
    const invoiceRef: any = await Invoice.findOne({
      where: { numero: invoice.numero },
    });
    if (invoiceRef) throw new Error("numero already exist");
  }

  /* Search supplier */
  const supplierRef: any = await Supplier.findOne({
    where: { id: invoice.supplier },
  });
  if (!supplierRef) throw new Error("Supplier not found");

  /* Add Inventory stock */
  const inventory: any = await setInventory(invoice.detalles);

  /* Create invoice */
  const invoiceRef: any = await Invoice.create(invoice);

  /* Add invoice to supplier */
  const addinvoiceRef: any = await supplierRef.addInvoices(invoiceRef);

  /* Add Inventory to Invoice */
  await invoiceRef.addStocks(inventory.map((i: any) => i.ref));

  return {
    invoice: {
      ...invoiceRef.dataValues,
      SupplierId: addinvoiceRef.dataValues.id,
      StockId: inventory.map((i: any) => i.data.id),
    },
    inventory: [
      ...inventory.map((i: any) => {
        return {
          ...i.data,
          InvoiceId: invoiceRef.dataValues.id,
        };
      }),
    ],
  };
};

const setServiceInvoice = async (invoice: any) => {
  const newInvoice: any = await Invoice.create(invoice);
  let newDetails = [];

  for (let i = 0; i < invoice.TotalDestail.length; i++) {
    newDetails.push(await TotalDestail.create(invoice.TotalDestail[i]));
  }

  await newInvoice.setTotalDestail(newDetails);

  const invoiceReturn = await Invoice.findOne({
    where: { id: newInvoice.id },
    include: { model: TotalDestail },
  });

  return invoiceReturn;
};

const getInvoices = async () => {
  const response = await Invoice.findAll();
  return response;
};

const updateInvoice = async (invoice: any) => {
  const query = await Invoice.findOne({
    where: { id: invoice.id },
  });

  if (query) await query.update(invoice);
  else throw new Error("invoice not found");
};

const deleteInvoice = async (invoiceId: string) => {
  await Invoice.destroy({ where: { id: invoiceId } });
};

export {
  setInvoices,
  setServiceInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice,
};
