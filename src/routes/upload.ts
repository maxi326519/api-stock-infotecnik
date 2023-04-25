import { Router } from "express";
import { Request, Response } from "express";
const {
  setImage,
  setInvoice,
  optimizeImg,
  deleteImage,
  deleteInvoiceFile,
} = require("./controllers/upload");
const router = Router();

router.post(
  "/image",
  setImage.single("file"),
  async (req: any, res: Response) => {
    try {
      /* optimizeImg(req.file.path, `resize-${req.file.filename}`, 100); */
      const data = {
        msg: "Uploaded image successfully",
        path: req.file?.filename,
      };

      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.post(
  "/files",
  setInvoice.single("file"),
  async (req: any, res: Response, file: any) => {
    try {
      /* optimizeImg(req.file.path, `resize-${req.file.filename}`, 100); */
      const data = {
        msg: "Uploaded invoice successfully",
        path: req.file?.filename,
      };

      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.delete("/image/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteImage(id);
    res.status(200).json({ msg: "Deleted image successfully" });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.delete("/invoice/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteInvoiceFile(id);
    res.status(200).json({ msg: "Deleted invoice successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
