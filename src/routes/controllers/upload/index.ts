import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import { Request } from "express";

// Create images storage
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/images");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    console.log(ext);
    cb(null, `${Date.now()}.${ext}`);
  },
});

// Create invoice files storage
const invoiceStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, "upload/invoices");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

const setImage = multer({ storage: imageStorage });

const setInvoice = multer({ storage: invoiceStorage });

const optimizeImg = (filePath: string, fileName: string, size = 300) => {
  return sharp(filePath)
    .resize(size)
    .toFile(`/upload/images/optimized/${fileName}.png`);
};

const deleteImage = (imageURL: string) => {
  const segments = imageURL.split('/');
  const fileName = segments[segments.length - 1];
  const url = `upload/images/${fileName}`;

  fs.unlink(url, (error) => {
    if (error) {
      console.error("Error deleting file:", error);
    } else {
      console.log("File deleted successfully:", url);
    }
  });
};

const deleteInvoice = async (invoiceURL: string) => {
  const segments = invoiceURL.split('/');
  const fileName = segments[segments.length - 1];
  const url = `upload/invoices/${fileName}`;

  fs.unlink(url, (error) => {
    if (error) {throw new Error("Error deleting file:")};
  });
};

export { setImage, setInvoice, optimizeImg, deleteImage, deleteInvoice, invoiceStorage };
