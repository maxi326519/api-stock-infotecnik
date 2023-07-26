import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import * as ejs from "ejs";
import { SaleDetail, SaleInvoice } from "../../interfaces/Sales";
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

// Función para generar la factura PDF
export const generateInvoicePDF = (invoiceData: InvoiceData): string => {
  // Crea un nuevo documento PDF
  const doc = new PDFDocument();

  // Image
  const imagePath = path.join(__dirname, "", "Infotecnik-logo.png"); // Reemplaza 'ruta/de/la/imagen/logo.png' con la ruta de tu imagen
  doc.image(imagePath, {
    fit: [400, 200], // Ajusta el tamaño de la imagen según tus necesidades
    align: "center",
  });

  // Genera el contenido de la factura
  doc.fontSize(100).text("Factura", { align: "center" });
  doc.moveDown();

  // Información de la factura
  doc.fontSize(12).text(`Número de factura: ${invoiceData.invoiceNumber}`);
  doc.fontSize(12).text(`Fecha: ${invoiceData.date}`);
  doc.moveDown();

  // Detalles de los productos/servicios
  doc.fontSize(12).text("Detalles:", { underline: true });
  doc.moveDown();
  let totalPrice = 0;

  invoiceData.items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    doc.fontSize(12).text(`${index + 1}. ${item.description}`);
    doc.fontSize(10).text(`   Cantidad: ${item.quantity}`);
    doc.fontSize(10).text(`   Precio unitario: $${item.price}`);
    doc.fontSize(10).text(`   Total: $${itemTotal}`);
    doc.moveDown();
  });

  doc.fontSize(30).text(`Total: $${totalPrice}`, { align: "right" });

  // Genera un nombre de archivo único para la factura PDF
  const fileName = `invoice_${invoiceData.invoiceNumber}.pdf`;

  // Ruta de la carpeta donde se guardará la factura (puedes cambiarla según tus necesidades)
  const folderPath = "./invoices";

  // Verifica si la carpeta existe, si no, créala
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  // Genera la ruta completa del archivo PDF
  const filePath = `${folderPath}/${fileName}`;

  // Guarda la factura en la carpeta
  doc.pipe(fs.createWriteStream(filePath));
  doc.end();

  // Devuelve la URL del archivo PDF
  return filePath;
};

export function crearTicketPDF(sale: SaleInvoice): string {
  const pdfDoc = new PDFDocument();
  const pdfFileName: string = "";

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
      product.StockId!.toString(),
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
      `€ ${product.precioUnitario.toString()}`,
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
