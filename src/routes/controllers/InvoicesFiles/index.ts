import { Op } from "sequelize";
import { InvoiceFile } from "../../../db/index";

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

const getAllInvoiceFiles = async (from: string, to: string) => {
  // Verifiques unlinked, si true devolver todos los que no tengan TransactionID, si el false utilizar el from y el to y traer todos dentro de 'from' y 'to'
let props;

unlinked true
  include: [
    {
      model: InvoiceFile,
      attributes: { exclude: ["TransactionId"] },
    },
  ],

unlinked false
  where: {
    fecha: {
      [Op.between]: [new Date(to), new Date(from)],
    },
  }

  let response = await InvoiceFile.findAll(props)
  return response
}

const getInvoiceFileById = async (fileId: string) => {
  const file = await InvoiceFile.findByPk(fileId);
  return file;
};

const handleInvoiceFileUpload = async (date:String, type:String, description:String, fileName:String) => {

  if (!date || !type || !description || !fileName) {
    throw new Error("Missing parameter.");
  }

  const fileData = {
    date: date,
    type: type,
    url: `upload/invoices/${fileName}`,
    description: description || null,
  };

  const savedFile = await saveInvoiceFile(fileData);

  return savedFile;
};

export {
  saveInvoiceFile,
  updateInvoiceFile,
  deleteInvoiceFile,
  getInvoiceFileById,
  handleInvoiceFileUpload,
  getAllInvoiceFiles,
};