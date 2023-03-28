const routerUpload = require("express").Router();
const {
  setImage,
  /*   setInvoice, */
  optimizeImg,
  deleteImage,
  deleteInvoiceFile,
} = require("./controllers/upload");

routerUpload.post(
  "/image",
  setImage.single("file"),
  async (req: any, res: any, file: any) => {
    try {
      console.log(req.file);
      /* optimizeImg(req.file.path, `resize-${req.file.filename}`, 100); */
      const data = {
        msg: "Uploaded image successfully",
        path: `/upload/images/${req.file.filename}`,
      };

      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

/* routerUpload.post(
  "/invoice",
  setInvoice.single("file"),
  async (req: any, res: any, file: any) => {
    try {
      res.status(200).json({ msg: "Uploaded invoice successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
); */

routerUpload.delete("/image/:id", async (req: any, res: any) => {
  try {
    console.log(req.Parameters);
    res.status(200).json({ msg: "Deleted image successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

routerUpload.delete("/invoice", async (req: any, res: any) => {
  try {
    res.status(200).json({ msg: "Deleted invoice successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = routerUpload;
