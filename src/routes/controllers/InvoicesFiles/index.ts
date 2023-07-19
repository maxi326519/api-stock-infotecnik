import { InvoiceFile } from "../../../db/index";
import { Request, Response } from "express";

const saveInvoiceFile = async (fileData: any) => {
  const createdFile = await InvoiceFile.create(fileData);
  return createdFile;
};

const updateInvoiceFile = async (fileId: string, updatedData: any) => {
  const updatedFile = await InvoiceFile.update(updatedData, {
    where: { id: fileId },
  });
  return updatedFile;
};

const deleteInvoiceFile = async (fileId: string) => {
  const deletedFile = await InvoiceFile.destroy({
    where: { id: fileId },
  });
  return deletedFile;
};

const getInvoiceFileById = async (fileId: string) => {
  const file = await InvoiceFile.findByPk(fileId);
  return file;
};

const handleInvoiceFileUpload = async (req: Request, res: Response) => {
  const { date, type, description } = req.body;

  if (!date || !type || !description) {
    throw new Error("Missing parameter.");
  }

  const fileData = {
    date: date,
    type: type,
    description: description || null,
  };

  const savedFile = await saveInvoiceFile(fileData);

  const data = {
    msg: "Uploaded invoice successfully",
    path: savedFile.dataValues.url,
  };

  res.status(200).json(data);
};

export {
  saveInvoiceFile,
  updateInvoiceFile,
  deleteInvoiceFile,
  getInvoiceFileById,
  handleInvoiceFileUpload,
};