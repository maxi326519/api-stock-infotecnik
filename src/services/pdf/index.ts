import PDFDocument from "pdfkit";
import fs from 'fs';

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

  // Genera el contenido de la factura
  doc.fontSize(20).text('Factura', { align: 'center' });
  doc.moveDown();

  // Información de la factura
  doc.fontSize(12).text(`Número de factura: ${invoiceData.invoiceNumber}`);
  doc.fontSize(12).text(`Fecha: ${invoiceData.date}`);
  doc.moveDown();

  // Detalles de los productos/servicios
  doc.fontSize(12).text('Detalles:', { underline: true });
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

  doc.fontSize(12).text(`Total: $${totalPrice}`, { align: 'right' });

  // Genera un nombre de archivo único para la factura PDF
  const fileName = `invoice_${invoiceData.invoiceNumber}.pdf`;

  // Ruta de la carpeta donde se guardará la factura (puedes cambiarla según tus necesidades)
  const folderPath = './invoices';

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