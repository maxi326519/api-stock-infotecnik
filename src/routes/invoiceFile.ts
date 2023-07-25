import { Router } from "express";
import { Request, Response } from "express";
const {
  updateInvoiceFile,
  deleteInvoiceFile,
  handleInvoiceFileUpload,
  getInvoiceFileById,
  getAllInvoiceFiles,
  
  } = require("./controllers/InvoicesFiles");
import { setInvoice } from "./controllers/upload/index"
const router = Router();

router.post(
    "/invoiceFile",
    setInvoice.single("file"),
    async (req: any, res: Response, file: any) => {
      try {
        
        const { date, type, description } = req.body;
        const fileName = req.file?.fileName
        const data =  handleInvoiceFileUpload(date, type, description, fileName)
  
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

  router.get("/allInvoiceFile", async (req: Request, res: Response) => {
    try {
      const { from, to } = req.query;
      if (typeof from === "string" && typeof to === "string") {
        const response = await getAllInvoiceFiles(from, to);
        res.status(200).send(response);
      } else {
        res.status(400).json({ error: "invalid querys" });
      }
    } catch (error: any) {
      switch (error.errors?.[0].type) {
        case "unique violation":
          res.status(400).json({ error: error.errors[0].message });
          break;
        case "notNull Violation":
          res
            .status(500)
            .json({ error: `missing parameter (${error.errors[0].path})` });
          break;
        default:
          res.status(500).json({ error: error.message });
          break;
      }
    }
  });

  