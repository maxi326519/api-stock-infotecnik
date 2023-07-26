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
  const url = `upload/${imageURL}`;
  console.log("URL", url);
  fs.unlink(url, (error) => {
    console.log(error);
  });
};

const deleteInvoiceFile = async (invoiceURL: string) => {
  const url = `upload/invoices/${invoiceURL}`;
  console.log("URL", url);
  fs.unlink(url, (error) => {
    console.log(error);
  });
};

export { setImage, setInvoice, optimizeImg, deleteImage, deleteInvoiceFile, invoiceStorage };
