import { Model, Op } from "sequelize";
import {
  Product,
  SaleDetail as SaleDetailDB,
  SaleInvoice as SaleInvoiceDB,
  Stock,
} from "../../../db";
import { SaleDetail, SaleInvoice } from "../../../interfaces";

async function setSale(sale: any) {
  // Create a new invoice
  const newSaleInvoice: any = await SaleInvoiceDB.create(sale);

  // Create the sale detils
  let newSaleDetail: any = [];

  try {
    for (let i = 0; i < sale.SaleDetails.length; i++) {
      // Get current sale stock
      const currentStock: any = await Stock.findOne({
        where: { id: sale.SaleDetails[i].StockId },
      });

      // Get current stock product
      let currentProduct: any;
      if (currentStock) {
        currentProduct = await Product.findOne({
          where: { id: currentStock.dataValues.ProductId },
        });
        if (currentProduct) {
          const currentSaleDetail = await SaleDetailDB.create(
            sale.SaleDetails[i]
          );
          currentStock.setSaleDetails(currentSaleDetail);
          currentProduct.setSaleDetails(currentSaleDetail);
          newSaleDetail.push(currentSaleDetail);
        } else throw new Error("product not found");
      } else throw new Error("stock not found");
    }
  } catch (err: any) {
    if (newSaleDetail) {
      await SaleDetailDB.destroy({
        where: { id: newSaleDetail.map((detail: any) => detail.dataValues.id) },
      });
    }
    newSaleInvoice.destroy();
    throw new Error(err);
  }

  // Add sale details to invoice
  await newSaleInvoice.setSaleDetails(newSaleDetail);

  return {
    ...newSaleInvoice.dataValues,
    SaleDetails: {
      ...newSaleDetail.map((detail: Model) => detail.dataValues),
    },
  };
}

async function getSales(from: string, to: string) {
  console.log(from, to);
  console.log(new Date(from), new Date(to));
  const sales = await SaleInvoiceDB.findAll({
    where: {
      fecha: {
        [Op.between]: [
          { [Op.gte]: new Date(from) },
          { [Op.lte]: new Date(to) },
        ],
      },
    },
    include: SaleDetailDB,
  });

  if (!sales) throw new Error("sales not found");

  return sales;
}

async function updateSaleInvoice(sale: SaleInvoice) {
  const invoice = await SaleInvoiceDB.findOne({
    where: { id: sale.id },
  });

  if (invoice) invoice.update(sale);
  else throw new Error("invoice not found");
}

async function updateSaleItem(sale: SaleDetail) {
  const invoice = await SaleInvoiceDB.findOne({
    include: SaleDetailDB,
    where: { id: sale.id },
  });

  if (invoice) {
    const updateItem = invoice.dataValues.SaleDetails.find(
      (item: SaleDetail) => item.id === sale.id
    );
    if (updateItem) {
      const lastItemQuantity = updateItem.dataValues.cantidad;
      const lastTotalItemPrice =
        updateItem.dataValues.precioUnitario * lastItemQuantity;
      const newItemQuantity = sale.cantidad;
      const newTotalItemPrice = sale.cantidad * sale.precioUnitario;

      const lastInvoiceItemQuantity = invoice.dataValues.cantidad;
      const lastInvoiceItemTotal = invoice.dataValues.total;
      const newInvoiceItemQuantity =
        lastInvoiceItemQuantity - lastItemQuantity + newItemQuantity;
      const newInvoicePrice =
        lastInvoiceItemTotal - lastTotalItemPrice + newTotalItemPrice;

      updateItem.update(sale);
      invoice.update({
        cantidad: newInvoiceItemQuantity,
        total: newInvoicePrice,
      });
    } else throw new Error("item sold not found");
  } else throw new Error("sale invoice not found");
}

async function deleteSaleInvoice(saleInvoiceId: string) {
  const invoice = await SaleInvoiceDB.findOne({
    include: {
      model: SaleDetailDB,
      attributes: ["id"],
    },
    where: { id: saleInvoiceId },
  });

  if (invoice) {
    const salesId: string = invoice.dataValues.SaleDetails.map(
      (detail: SaleDetail): string => detail.id
    );
    await SaleDetailDB.destroy({ where: { id: salesId } });
    invoice.destroy();
  }
}

async function deleteSaleItem(saleItemId: string) {
  const saleDetail = await SaleDetailDB.findOne({
    include: SaleInvoiceDB,
    where: { id: saleItemId },
  });

  if (saleDetail) {
    const invoiceTotal: number =
      saleDetail.dataValues.SaleInvoice.dataValues.total;
    const invoiceAmount: number =
      saleDetail.dataValues.SaleInvoice.dataValues.cantidad;
    const unitPrice: number = saleDetail.dataValues.precioUnitario;
    const amount: number = saleDetail.dataValues.cantidad;

    saleDetail.dataValues.SaleInvoice.update({
      cantidad: invoiceAmount - amount,
      total: invoiceTotal - unitPrice * amount,
    });
    saleDetail.destroy();
  }
}

export {
  setSale,
  getSales,
  updateSaleInvoice,
  updateSaleItem,
  deleteSaleInvoice,
  deleteSaleItem,
};
