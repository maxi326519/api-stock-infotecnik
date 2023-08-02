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

interface QueryParameters {
  unlinked: string;
  from?: string;
  to?: string;
}

const getAllInvoiceFiles = async (query: QueryParameters) => {
  const { unlinked, from, to } = query;

  if (unlinked === 'true') {
    const unlinkedInvoices = await InvoiceFile.findAll({
      where: {
        TransactionId: null,
      },
    });

    return unlinkedInvoices;
  } else if (unlinked === 'false' && from && to) {
    const invoicesInRange = await InvoiceFile.findAll({
      where: {
        fecha: {
          [Op.between]: [from, to],
        },
      },
    });

    return invoicesInRange;
  } else {
    throw new Error('Invalid query parameters.');
  }
};

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