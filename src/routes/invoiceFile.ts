import { Router } from "express";
import { Request, Response } from "express";
const {
  saveInvoiceFile,
  updateInvoiceFile,
  deleteInvoiceFile,
  handleInvoiceFileUpload,
  getInvoiceFileById,
  } = require("./controllers/InvoicesFiles");
const router = Router();

router.post(
    "/invoiceFile",
    handleInvoiceFileUpload.single("file"),
    async (req: any, res: Response, file: any) => {
      try {
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

  router.delete("/invoiceFile/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await deleteInvoiceFile(id);
      res.status(200).json({ msg: "Deleted File successfully" });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });

  router.patch("/", async (req: Request, res: Response) => {
    try {
      const newInvoice = req.body;
      await updateInvoiceFile(newInvoice);
      res.status(200).json({ message: "Document has been replaced succesfully" });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  });

  router.get("/invoiceFile/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const file = await getInvoiceFileById(id);
  
      if (!file) {
        res.status(404).json({ error: "File not found" });
      } else {
        res.status(200).json({ file });
      }
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });


  