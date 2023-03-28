const multer = require("multer");
const sharp = require("sharp");

// Create images storage
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    console.log(ext)
    cb(null, `${Date.now()}.${ext}`);
  },
});

// Create invoice files storage
/* const invoiceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/invoices");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${ext}`);
  },
}); */

const setImage = multer({ imageStorage });

/* const setInvoice = multer({ invoiceStorage }); */

const optimizeImg = (filePath, fileName, size = 300) => {
  return sharp(filePath)
    .resize(size)
    .toFile(`/upload/images/optimized/${fileName}.png`);
};

const deleteImage = (imageURL) => {};

const deleteInvoiceFile = (invoiceURL) => {};

module.exports = {
  setImage,
/*   setInvoice, */
  optimizeImg,
  deleteImage,
  deleteInvoiceFile,
};
