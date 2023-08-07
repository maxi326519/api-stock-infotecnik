import { Router } from "express";
import { Request, Response } from "express";
import { setInvoice } from "./controllers/upload/index"
const {
  updateInvoiceFile,
  deleteInvoiceFile,
  handleInvoiceFileUpload,
  getInvoiceFileById,
  getAllInvoiceFiles,
} = require("./controllers/InvoicesFiles");
const router = Router();

router.post(
  "/",
  setInvoice.single("file"),
  async (req: any, res: Response, file: any) => {
    try {
      const { date, type, description } = req.body;
      const filename = req.file?.filename
      const data = await handleInvoiceFileUpload(date, type, description, filename);

      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.get("/:id", async (req: Request, res: Response) => {
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

router.get('/', async (req: Request, res: Response) => {
  const { unlinked, from, to } = req.query;

  try {
    const queryParameters = {
      unlinked: unlinked?.toString() || '',
      from: from?.toString(),
      to: to?.toString(),
    };

    const invoices = await getAllInvoiceFiles(queryParameters);
    res.status(200).json(invoices);
  } catch (error: any) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
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


export default router;
