import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { SaleDetail, SaleInvoice, TipoImpositivoSale } from "../../interfaces/Sales";
import { tipoImpositivo } from "../../interfaces";

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  items: InvoiceItem[];
}

export default function createInvoicePDF(sale: SaleInvoice): string {
  const pdfDoc = new PDFDocument();
  const pdfFileName: string = Date.now().toString();

  const pdfWidth = 610;

  try {
    // Crea un flujo de escritura para guardar el PDF en la carpeta "uploads/tickets"
    const pdfFilePath = `./upload/tickets/${pdfFileName}.pdf`; /* path.join(__dirname, 'uploads', 'tickets', pdfFileName) */
    const writeStream = fs.createWriteStream(pdfFilePath);
    pdfDoc.pipe(writeStream);

    pdfkitHeader(pdfWidth, pdfDoc, sale);
    pdfkitTable(pdfWidth, pdfDoc, sale.SaleDetails);
    pdfkitFooter(pdfWidth, pdfDoc, sale.total, sale.SaleDetails);

    // Cierra el documento PDF
    pdfDoc.end();

    return `tickets/${pdfFileName}.pdf`;
  } catch (error) {
    console.error("Error al crear el ticket de venta:", error);
    return "";
  }
}

function pdfkitHeader(pdfWidth: number, doc: PDFKit.PDFDocument, sale: SaleInvoice) {

  const ystart = 100;
  const leftStart = 30;
  const rightStart = pdfWidth / 2;

  const columnLength = (pdfWidth / 2) - leftStart;

  const columnLeftStyle = {
    width: columnLength,
    align: "left",
  }

  const columnRightStyle = {
    width: columnLength,
    align: "right",
  }

  doc.rect(leftStart - 5, ystart - 5, columnLength + 5, 110 + 10).stroke();
  doc.rect(rightStart, ystart - 5, columnLength + 10, 110 + 10).stroke();

  // Image
  const imagePath = path.join(__dirname, "", "Infotecnik-logo.png");
  doc.image(imagePath, 200, 15, { width: 200 });

  doc.fontSize(10);
  doc.text("Razon social: MARC MARTIN SOLE", leftStart, ystart, columnLeftStyle);
  doc.text("Domicilio social: Av Paisos Catalans 80 ES40368101L", leftStart, ystart + 20, columnLeftStyle);
  doc.text("CP: 1782", leftStart, ystart + 40, columnLeftStyle);
  doc.text("Localidad: Banyoles", leftStart, ystart + 60, columnLeftStyle);
  doc.text("Provincia: Girona ", leftStart, ystart + 80, columnLeftStyle);
  doc.text("C.I.F/D.N.I: 40368101L", leftStart, ystart + 100, columnLeftStyle);

  doc.text("Fecha: 15/03/2023", rightStart, ystart, columnRightStyle);
  doc.text("Nº Factura: 3974357", rightStart, ystart + 20, columnRightStyle);
  doc.text("Fecha pedido: 01/03/2023", rightStart, ystart + 40, columnRightStyle);
  doc.text("Nº Pedido: 102866209", rightStart, ystart + 60, columnRightStyle);
  doc.text("Forma de pago: Tarjetas", rightStart, ystart + 80, columnRightStyle);
}

function pdfkitTable(pdfWidth: number, doc: PDFKit.PDFDocument, products: SaleDetail[]) {
  // Positions and sizes
  const xStart = 30;
  const yStart = 230;
  let yPosition = yStart;

  let columWithOne = 60;
  let columWithTwo = 80;
  let columtWithThree = 200;
  let columtWithFour = 70;
  let columtWithFive = 70;
  let columtWithSix = 70;

  let columOneX = xStart;
  let columTwoX = xStart + columWithOne;
  let columtThreeX = xStart + columWithOne + columWithTwo;
  let columtFourX = xStart + columWithOne + columWithTwo + columtWithThree;
  let columtFiveX = xStart + columWithOne + columWithTwo + columtWithThree + columtWithFour;
  let columtSixX = xStart + columWithOne + columWithTwo + columtWithThree + columtWithFour + columtWithSix;

  let rowHeigth = 20;

  // Styles
  const columnStyleOne = {
    width: columWithOne,
    align: "center",
  };

  const columnStyleTwo = {
    width: columWithTwo,
    align: "center",
  };

  const columnStyleThree = {
    width: columtWithThree,
    align: "left",
  };

  const columnStyleFour = {
    width: columtWithFour,
    align: "right",
  };

  const columnStyleFive = {
    width: columtWithFive,
    align: "right",
  };

  const columnStyleSix = {
    width: columtWithSix,
    align: "right",
  };

  // Table
  doc.rect(xStart - 5, yStart - 5, pdfWidth - (xStart * 2) + 15, 20).stroke();
  doc.rect(xStart - 5, yStart - 5, pdfWidth - (xStart * 2) + 15, 400).stroke();

  // Header
  doc.font("Helvetica-Bold");
  doc.fontSize(12);
  doc.text("Unidades", columOneX, yPosition, columnStyleOne);
  doc.text("Codigo", columTwoX, yPosition, columnStyleTwo);
  doc.text("Concepto", columtThreeX, yPosition, columnStyleThree);
  doc.text("Impuesto", columtFourX, yPosition, columnStyleFour);
  doc.text("Precio unit.", columtFiveX, yPosition, columnStyleFive);
  doc.text("Importe", columtSixX, yPosition, columnStyleSix);

  yPosition += rowHeigth;

  // Data table styles
  doc.fontSize(12);
  doc.font("Helvetica");

  products.forEach((product) => {
    doc.text(
      `${product.cantidad} u.`,
      columOneX,
      yPosition,
      columnStyleOne
    );
    doc.text(
      `${product.ProductId}`,
      columTwoX,
      yPosition,
      columnStyleTwo
    );
    doc.text(
      `${product.concepto}`,
      columtThreeX,
      yPosition,
      columnStyleThree
    );
    doc.text(
      `${product.tipoImpositivo}`,
      columtFourX,
      yPosition,
      columnStyleFour
    );
    doc.text(
      `${Number(product.baseImponible).toFixed(2)} €`,
      columtFiveX,
      yPosition,
      columnStyleFive
    );
    doc.text(
      `${(product.baseImponible + product.ivaMonto + product.recargoMonto).toFixed(2)} €`,
      columtSixX,
      yPosition,
      columnStyleSix
    );
    yPosition += rowHeigth; // Espacio para cada fila
  });
}

function pdfkitFooter(pdfWidth: number, doc: PDFKit.PDFDocument, total: number, products: SaleDetail[]) {
  const ystart = 620;

  const baseREBU: number = products.reduce((acc, product) => acc += product.tipoImpositivo === TipoImpositivoSale.REBU ? product.ivaMonto : 0, 0);
  const totalREBU: number = products.reduce((acc, product) => acc += product.tipoImpositivo === TipoImpositivoSale.REBU ? product.ivaMonto : 0, 0);

  const baseIVA: number = products.reduce((acc, product) => acc += product.tipoImpositivo !== TipoImpositivoSale.REBU ? product.baseImponible + product.recargoMonto : 0, 0);
  const montoIVA: number = products.reduce((acc, product) => acc += product.tipoImpositivo !== TipoImpositivoSale.REBU ? product.ivaMonto : 0, 0);
  const totalIVA: number = products.reduce((acc, product) => acc += product.tipoImpositivo !== TipoImpositivoSale.REBU ? product.baseImponible + product.recargoMonto + product.ivaMonto : 0, 0);

  const TOTAL: number = totalREBU + totalIVA;

  doc.fontSize(15);

  doc.rect(290, ystart + 20, 300, 20).stroke();
  doc.rect(290, ystart + 40, 300, 20).stroke();
  doc.rect(290, ystart + 60, 300, 20).stroke();

  doc.rect(380, ystart + 20, 70, 60).stroke();
  doc.rect(450, ystart + 20, 70, 60).stroke();
  doc.rect(520, ystart + 20, 70, 80).stroke();

  // HEADER
  doc.fontSize(12);
  doc.font("Helvetica-Bold");
  doc.text("Resumen IVA", 290, ystart + 25, {
    width: 90,
    align: "center",
  });
  doc.text("Base", 380, ystart + 25, {
    width: 70,
    align: "center",
  });
  doc.text("IVA", 450, ystart + 25, {
    width: 70,
    align: "center",
  });
  doc.text("Total", 520, ystart + 25, {
    width: 70,
    align: "center",
  });

  // Body
  doc.fontSize(10);
  doc.font("Helvetica");

  doc.text("REBU", 300, ystart + 45, {
    width: 70,
    align: "left",
  });
  doc.text(`${baseREBU.toFixed(2)} €`, 370, ystart + 45, {
    width: 70,
    align: "right",
  });
  doc.text("-", 440, ystart + 45, {
    width: 70,
    align: "right",
  });
  doc.text(`${totalREBU.toFixed(2)} €`, 510, ystart + 45, {
    width: 70,
    align: "right",
  });

  doc.text("I.V.A. 21%", 300, ystart + 65, {
    width: 70,
    align: "left",
  });
  doc.text(`${baseIVA.toFixed(2)} €`, 370, ystart + 65, {
    width: 70,
    align: "right",
  });
  doc.text(`${montoIVA.toFixed(2)} €`, 440, ystart + 65, {
    width: 70,
    align: "right",
  });
  doc.text(`${totalIVA.toFixed(2)} €`, 510, ystart + 65, {
    width: 70,
    align: "right",
  });

  doc.text(`${TOTAL.toFixed(2)} €`, 510, ystart + 85, {
    width: 70,
    align: "right",
  });
}
