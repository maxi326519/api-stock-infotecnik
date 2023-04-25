import {
  Invoice,
  TotalDetail,
  Supplier,
  InvoiceType,
  Stock,
} from "../../../db/index";
import { setInventory } from "../inventory";

const setInvoices = async (invoice: any) => {
  /* Validations */
  if (invoice.fecha === undefined) throw new Error("missing parameter (fecha)");
  if (invoice.numero === undefined)
    throw new Error("missing parameter (numero)");
  if (invoice.total === undefined) throw new Error("missing parameter (total)");
  if (invoice.pendiente === undefined)
    throw new Error("missing parameter (numero)");
  if (invoice.tipo === undefined) throw new Error("missing parameter (tipo)");
  if (invoice.total === undefined) throw new Error("missing parameter (total)");
  if (invoice.TotalDetails === undefined)
    throw new Error("missing parameter (TotalDetails)");
  if (!invoice.pendiente && !invoice.archivo)
    throw new Error("missing parameter (archivo)");
  if (invoice.tipoImpositivo === undefined)
    throw new Error("missing parameter (tipoImpositivo)");
  if (invoice.Stock === undefined) throw new Error("missing parameter (Stock)");
  if (invoice.SupplierId === undefined)
    throw new Error("missing parameter (SupplierId)");
  if (invoice.Stock.length <= 0) throw new Error("No se adjunto inventario");

  if (invoice.numero !== "") {
    const invoiceRef: any = await Invoice.findOne({
      where: { numero: invoice.numero },
    });
    if (invoiceRef) throw new Error("numero already exist");
  }

  /* Search supplier */
  const supplierRef: any = await Supplier.findOne({
    where: { id: invoice.SupplierId },
  });
  if (!supplierRef) throw new Error("Supplier not found");

  /* Create TotalDetails */
  let newDetails = [];
  for (let i = 0; i < invoice.TotalDetails.length; i++) {
    newDetails.push(await TotalDetail.create(invoice.TotalDetails[i]));
  }

  /* Create Inventory stock */
  const inventory: any = await setInventory(invoice.Stock);

  /* Create invoice */
  const invoiceRef: any = await Invoice.create(invoice);

  /* Add invoice to supplier */
  const addinvoiceRef: any = await supplierRef.addInvoices(invoiceRef);

  /* Add TotalDetails */
  await invoiceRef.setTotalDetails(newDetails);

  /* Add Inventory to Invoice */
  await invoiceRef.addStocks(inventory.map((i: any) => i.ref));

  return {
    invoice: {
      ...invoiceRef.dataValues,
      SupplierId: addinvoiceRef.dataValues.id,
      StockId: inventory.map((i: any) => i.data.id),
      TotalDetails: newDetails.map((details) => {
        delete details.dataValues.id;
        return details.dataValues;
      }),
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
  if (invoice.fecha === undefined) throw new Error("missing parameter (fecha)");
  if (invoice.numero === undefined)
    throw new Error("missing parameter (numero)");
  if (invoice.total === undefined) throw new Error("missing parameter (total)");
  if (invoice.pendiente === undefined)
    throw new Error("missing parameter (numero)");
  if (invoice.tipo === undefined) throw new Error("missing parameter (tipo)");
  if (invoice.total === undefined) throw new Error("missing parameter (total)");
  if (invoice.TotalDetails === undefined)
    throw new Error("missing parameter (TotalDetails)");
  if (!invoice.pendiente && !invoice.archivo)
    throw new Error("missing parameter (archivo)");
  if (invoice.tipoImpositivo === undefined)
    throw new Error("missing parameter (tipoImpositivo)");
  if (invoice.SupplierId === undefined)
    throw new Error("missing parameter (SupplierId)");

  const newInvoice: any = await Invoice.create(invoice);
  let newDetails = [];

  for (let i = 0; i < invoice.TotalDetails.length; i++) {
    newDetails.push(await TotalDetail.create(invoice.TotalDetails[i]));
  }

  await newInvoice.setTotalDetails(newDetails);
  await newInvoice.setSupplier(invoice.SupplierId);

  const invoiceReturn = await Invoice.findOne({
    where: { id: newInvoice.id },
    include: {
      model: TotalDetail,
      attributes: { exclude: ["id", "InvoiceId"] },
    },
  });

  return invoiceReturn;
};

const getInvoices = async () => {
  let response = await Invoice.findAll({
    include: [
      {
        model: Stock,
        attributes: ["id"],
      },
      {
        model: TotalDetail,
        attributes: { exclude: ["id", "InvoiceId"] },
      },
    ],
  });

  if (response) {
    response = response
      .map((data) => data.dataValues)
      .map((data) => {
        const stocks = data.Stocks;
        delete data.Stocks;
        if (stocks.length > 0) {
          return {
            ...data,
            StockId: stocks.map((stock: any) => stock.id),
          };
        }
        return data;
      });
  }
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

const setTypes = async (data: any) => {
  let remove: any = []; // Types to add
  let create: any = []; // Types to delete

  // Get all types
  const typesRef = await InvoiceType.findAll();

  // Get the name of the types in dataBase
  let list = typesRef.map((type: any) => type.tipo);

  // Check types to remove
  list.map((typeName) => {
    if (!data.includes(typeName)) {
      remove.push(typeName);
    }
  });
  await InvoiceType.destroy({
    where: { tipo: remove },
  });

  // Add to create new data
  data.forEach((typeName: any) => {
    if (!list.includes(typeName)) {
      create.push({ tipo: typeName });
    }
  });

  console.log(data);
  console.log(create);

  await InvoiceType.bulkCreate(create);

  const allData = await InvoiceType.findAll();
  console.log(allData);

  return allData;
};

const getTypes = async () => {
  const response = await InvoiceType.findAll();
  return response;
};

export {
  setInvoices,
  setServiceInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice,
  setTypes,
  getTypes,
};
