const routerUpload = require("express").Router();
const {
  setImage,
  setInvoice,
  optimizeImg,
  deleteImage,
  deleteInvoiceFile,
} = require("./controllers/upload");

routerUpload.post(
  "/image",
  setImage.single("file"),
  async (req: any, res: any, file: any) => {
    try {
      /* optimizeImg(req.file.path, `resize-${req.file.filename}`, 100); */
      const data = {
        msg: "Uploaded image successfully",
        path: `/images/${req.file.filename}`,
      };

      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

routerUpload.post(
  "/files",
  setInvoice.single("file"),
  async (req: any, res: any, file: any) => {
    try {
      /* optimizeImg(req.file.path, `resize-${req.file.filename}`, 100); */
      const data = {
        msg: "Uploaded invoice successfully",
        path: `/invoices/${req.file.filename}`,
      };

      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

routerUpload.delete("/image/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    await deleteImage(id);
    res.status(200).json({ msg: "Deleted image successfully" });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

routerUpload.delete("/invoice/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    await deleteInvoiceFile(id);
    res.status(200).json({ msg: "Deleted invoice successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = routerUpload;
