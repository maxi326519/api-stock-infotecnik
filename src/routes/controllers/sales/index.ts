import { Model, Op } from "sequelize";
import { createRectifyInvoicePDF } from "../../../services/pdf/createRectifyInvoicePDF";
import { createRectifyTicketPDF } from "../../../services/pdf/createRectifyTicketPDF";
import { deleteInvoice } from "../upload";
import { Stock } from "../../../interfaces/Stock";
import {
  SaleDetail,
  PriceDetail,
  SaleInvoice,
  TipoCliente,
} from "../../../interfaces/Sales";
import {
  Product,
  PriceDetails as PriceDetailDB,
  SaleDetail as SaleDetailDB,
  SaleInvoice as SaleInvoiceDB,
  Stock as StockDB,
} from "../../../db";
import createInvoicePDF from "../../../services/pdf/createInvoicePDF";
import crearTicketPDF from "../../../services/pdf/createTicketPDF";

async function setSale(sale: SaleInvoice) {
  // Destructuring
  const {
    fecha,
    tipoImpositivo,
    total,
    numero,
    generada,
    tipo,
    SaleDetails,
    PriceDetails,
  }: SaleInvoice = sale;

  // Validations
  if (!fecha) throw new Error("missing parameter 'fecha'");
  if (!tipoImpositivo) throw new Error("missing parameter 'tipoImpositivo'");
  if (!total === undefined) throw new Error("missing parameter 'total'");
  if (!generada === undefined) throw new Error("missing parameter 'generada'");
  if (!tipo === undefined) throw new Error("missing parameter 'tipo'");
  if (!SaleDetails) throw new Error("missing parameter 'SaleDetails'");
  if (!PriceDetails) throw new Error("missing parameter 'PriceDetails'");

  // Generate pdf
  let pdfUrl: string = "";
  if (generada && tipo === TipoCliente.PARTICULAR) {
    pdfUrl = crearTicketPDF(sale);
  } else if (generada && tipo === TipoCliente.EMPRESA) {
    pdfUrl = createInvoicePDF(sale);
  }

  // Create new invoice
  let currentSaleInvoice: any = {
    fecha: new Date(fecha),
    tipoImpositivo,
    total,
    tipo,
    generada,
    pdfUrl,
  };

  if (numero) {
    currentSaleInvoice.numero = numero;
  } else {
    const newNumero = `${tipo}${Math.floor(Math.random() * 1000000)}`;
    currentSaleInvoice.numero = newNumero;
  }

  let newSaleInvoice: any = await SaleInvoiceDB.create(currentSaleInvoice);

  let newSaleDetail: Model<SaleDetail>[] = [];
  let newPriceDetails: Model<PriceDetail>[] = [];

  try {
    for (let i = 0; i < (SaleDetails as SaleDetail[]).length; i++) {
      // Create a SaleDetail per stock
      const currentDetail: SaleDetail = SaleDetails[i];
      const newDetail = {
        ...currentDetail,
        fecha: new Date(currentDetail.fecha),
      };
      const currentSaleDetail = await SaleDetailDB.create(newDetail);

      // Get current stock
      const currentStock: any = await StockDB.findOne({
        where: { id: newDetail.StockId },
      });

      // If stock exist
      let currentProduct: any;
      if (currentStock) {
        // Get the product
        currentProduct = await Product.findOne({
          where: { id: currentStock.dataValues.ProductId },
        });

        // Update the product and stock
        newDetail.cantidad; // Cantidad a vender
        currentStock.dataValues.cantidad; // Cantidad de stock actual
        currentProduct.dataValues.cantidad; // Cantidad total de stock en un producto

        // Si hay suficiente cantidad en stock actualzar, si no devolver error
        if (newDetail.cantidad <= currentStock.dataValues.cantidad) {
          const newStockQuantity =
            currentStock.dataValues.cantidad - newDetail.cantidad;
          const newProductQuantity =
            currentProduct.dataValues.cantidad - newDetail.cantidad;

          console.log(
            "Stock",
            newStockQuantity,
            currentStock.dataValues.cantidad,
            newDetail.cantidad
          );
          console.log(
            "Product",
            newProductQuantity,
            currentProduct.dataValues.cantidad,
            newDetail.cantidad
          );

          await currentStock.update({ cantidad: newStockQuantity });
          await currentProduct.update({ cantidad: newProductQuantity });
        } else {
          throw new Error("Insufficient stock");
        }

        // If product exist
        if (currentProduct) {
          await currentStock.setSaleDetails(currentSaleDetail);
          await currentProduct.setSaleDetails(currentSaleDetail);
          newSaleDetail.push(currentSaleDetail);
        } else throw new Error("product not found");
      }
    }

    // Recorrer PriceDetails
    for (let i = 0; i < PriceDetails.length; i++) {
      const priceDetail = PriceDetails[i];
      let newPriceDetail = {};

      // Verificar si metodoDePago es "CONTRATO COMPRAVENTA", se verifica que exista nroOperacion
      if (priceDetail.metodoDePago === "CONTRATO COMPRAVENTA") {
        if (priceDetail.nroOperacion) {
          newPriceDetail = {
            ...priceDetail,
          };
        } else {
          throw new Error("Missing 'nroOperacion' for CONTRATO COMPRAVENTA");
        }
      } else {
        newPriceDetail = {
          monto: priceDetail.monto,
        };
        continue;
      }

      // Conectar el PriceDetail con el Saleinvoice
      const createdPriceDetail = await PriceDetailDB.create(newPriceDetail);
      newPriceDetails.push(createdPriceDetail);
      await newSaleInvoice.addPriceDetails(createdPriceDetail);
    }
  } catch (err: any) {
    // Delete created SaleDetails
    for (const data of newSaleDetail) {
      await data.destroy();
    }

    // Delete created PriceDetails
    for (const data of newPriceDetails) {
      await data.destroy();
    }

    // Delete created SaleInvocie
    await newSaleInvoice.destroy();

    throw new Error(err);
  }

  // Add sale details to invoice
  for (const detail of newSaleDetail) {
    await newSaleInvoice.addSaleDetails(detail);
  }

  return {
    ...newSaleInvoice.dataValues,
    SaleDetails: newSaleDetail.map((detail) => detail.dataValues),
  };
}

async function getSales(from: string, to: string) {
  const sales = await SaleInvoiceDB.findAll({
    /*     where: {
      fecha: {
        [Op.between]: [
          { [Op.gte]: new Date(from) },
          { [Op.lte]: new Date(to) },
        ],
      },
    }, */
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
      const newTotalItemPrice = sale.cantidad * sale.baseImponible;

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

const rectifyingSaleInvoice = async (saleId: string) => {
  const saleInvoice = await SaleInvoiceDB.findOne({
    where: { id: saleId },
    include: [{ model: SaleDetailDB }],
  });

  if (!saleInvoice) {
    return null;
  }

  let pdfUrl = "";
  if (saleInvoice.dataValues.tipo === 1) {
    pdfUrl = createRectifyTicketPDF(saleInvoice.dataValues);
  } else if (saleInvoice.dataValues.tipo === 2) {
    pdfUrl = createRectifyInvoicePDF(saleInvoice.dataValues);
  } else if (!pdfUrl) throw new Error("type value invalid.");

  await saleInvoice.update({ rectifyPdfUrl: pdfUrl });

  return pdfUrl;
};

const deleteRectifyingSaleInvoice = async (saleId: string) => {
  const saleInvoice = await SaleInvoiceDB.findOne({
    where: { id: saleId },
  });

  if (!saleInvoice) {
    throw new Error("Sale No Found.");
  }

  const rectifyPdfUrl = saleInvoice.getDataValue("rectifyPdfUrl");

  if (rectifyPdfUrl) {
    await deleteInvoice(rectifyPdfUrl);
  }

  await saleInvoice.destroy();
};

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
      (detail: SaleDetail): string => detail.id!
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
  rectifyingSaleInvoice,
  deleteSaleInvoice,
  deleteSaleItem,
  deleteRectifyingSaleInvoice,
};
