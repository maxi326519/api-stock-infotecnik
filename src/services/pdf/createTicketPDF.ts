import { SaleDetail, SaleInvoice } from "../../interfaces/Sales";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";

export default function crearTicketPDF(sale: SaleInvoice): string {
  const pdfDoc = new PDFDocument();
  const pdfFileName: string = Date.now().toString();

  try {
    // Crea un flujo de escritura para guardar el PDF en la carpeta "uploads/tickets"
    const pdfFilePath = `./upload/tickets/${pdfFileName}.pdf`; /* path.join(__dirname, 'uploads', 'tickets', pdfFileName) */
    const writeStream = fs.createWriteStream(pdfFilePath);
    pdfDoc.pipe(writeStream);

    pdfkitHeader(pdfDoc, sale);
    pdfkitTable(pdfDoc, sale.SaleDetails);
    pdfkitFooter(pdfDoc, sale.total);

    // Cierra el documento PDF
    pdfDoc.end();

    return `tickets/${pdfFileName}.pdf`;
  } catch (error) {
    console.error("Error al crear el ticket de venta:", error);
    return "";
  }
}

function pdfkitHeader(doc: PDFKit.PDFDocument, sale: SaleInvoice) {
  // Image
  const imagePath = path.join(__dirname, "", "Infotecnik-logo.png");
  doc.image(imagePath, 150, 15, { width: 300 });

  doc.fontSize(20);
  doc.text(`MARC MARTIN SOLE`, 0, 120, {
    width: 600,
    align: "center",
  });

  doc.fontSize(12);
  doc.text(`AV. PAISOS CATALANS 80`, 0, 125, {
    width: 200,
    align: "center",
  });
  doc.text(`17820 - BANYOLES`, 400, 125, {
    width: 200,
    align: "center",
  });

  doc.fontSize(15);
  doc.text(`Factura Simplificada`, 0, 150, {
    width: 300,
    align: "center",
  });
  doc.text(`${sale.numero}`, 0, 170, {
    width: 300,
    align: "center",
  });

  doc.text(`Data`, 300, 150, {
    width: 300,
    align: "center",
  });
  doc.text(`${sale.fecha}`, 300, 170, {
    width: 300,
    align: "center",
  });
}

function pdfkitTable(doc: PDFKit.PDFDocument, products: SaleDetail[]) {
  // Positions and sizes
  const xStart = 30;
  const yStart = 220;
  let yPosition = yStart;

  let columWithOne = 250;
  let columWithTwo = 150;
  let columtWithThree = 150;

  let columOneX = xStart;
  let columTwoX = xStart + columWithOne;
  let columtThreeX = xStart + columWithOne + columWithTwo;

  let rowHeigth = 30;

  // Styles
  const columnStyleOne = {
    width: columWithOne,
    align: "left",
  };

  const columnStyleTwo = {
    width: columWithTwo,
    align: "right",
  };

  const columnStyleThree = {
    width: columtWithThree,
    align: "right",
  };

  // Header
  doc.font("Helvetica-Bold");
  doc.fontSize(25);
  doc.text("Descripción", columOneX, yPosition, columnStyleOne);
  doc.text("Cantidad", columTwoX, yPosition, columnStyleTwo);
  doc.text("Precio", columtThreeX, yPosition, columnStyleThree);

  yPosition += rowHeigth + 10;

  // Data table styles
  doc.fontSize(23);
  doc.font("Helvetica");

  products.forEach((product) => {
    doc.text(
      product.concepto!.toString(),
      columOneX,
      yPosition,
      columnStyleOne
    );
    doc.text(
      `${product.cantidad.toString()} u.`,
      columTwoX,
      yPosition,
      columnStyleTwo
    );
    doc.text(
      `€ ${product.baseImponible.toString()}`,
      columtThreeX,
      yPosition,
      columnStyleThree
    );

    yPosition += rowHeigth; // Espacio para cada fila
  });
}

function pdfkitFooter(doc: PDFKit.PDFDocument, total: number) {
  const ystart = 640;

  doc.fontSize(15);
  doc.text("GARANTÍA DE 1 AÑO EN ACCESORIOS", 0, ystart, {
    width: 600,
    align: "center",
  });

  doc.rect(20, ystart + 20, 570, 30).stroke();
  doc.rect(20, ystart + 50, 570, 30).stroke();

  doc.fontSize(20);
  doc.text("TOTAL IVA INC.", 0, ystart + 25, {
    width: 600,
    align: "center",
  });
  doc.text(`€${total.toFixed(2)}`, 0, ystart + 55, {
    width: 580,
    align: "right",
  });
}
