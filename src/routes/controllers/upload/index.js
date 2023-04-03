const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

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
  destination: (req, file, cb) => {
    cb(null, "upload/invoices");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

const setImage = multer({ storage: imageStorage });

const setInvoice = multer({ storage: invoiceStorage });

const optimizeImg = (filePath, fileName, size = 300) => {
  return sharp(filePath)
    .resize(size)
    .toFile(`/upload/images/optimized/${fileName}.png`);
};

const deleteImage = (imageURL) => {
  const url = `upload/images/${imageURL}`;
  console.log("URL", url);
  fs.unlink(url, (error) => {
    console.log(error);
  });
};

const deleteInvoiceFile = async (invoiceURL) => {
  const url = `upload/invoices/${invoiceURL}`;
  console.log("URL", url);
  fs.unlink(url, (error) => {
    console.log(error);
  });
};

module.exports = {
  setImage,
  setInvoice,
  optimizeImg,
  deleteImage,
  deleteInvoiceFile,
};
