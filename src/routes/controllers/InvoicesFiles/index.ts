import { Op } from "sequelize";
import { InvoiceFile } from "../../../db/index";

const saveInvoiceFile = async (fileData: any) => {
  const createdFile = await InvoiceFile.create(fileData);
  return createdFile;
};

const updateInvoiceFile = async (fileData: any) => {
  await InvoiceFile.update(fileData, {
    where: { id: fileData.id },
  });
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

  if (unlinked === undefined) throw new Error('Invalid query parameters: unlinked');
  if (!from) throw new Error('Invalid query parameters: from');
  if (!to) throw new Error('Invalid query parameters: to');

  if (unlinked === 'true') {
    const unlinkedInvoices = await InvoiceFile.findAll({
      attributes: { exclude: ["TransactionId"] },
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
  }
};

const getInvoiceFileById = async (fileId: string) => {
  const file = await InvoiceFile.findByPk(fileId);
  return file;
};

const handleInvoiceFileUpload = async (date: String, type: String, description: String, fileName: String) => {
  if (!date) throw new Error("missing parameter: date")
  if (!type) throw new Error("missing parameter: type")
  if (!description) throw new Error("missing parameter: description")

  const fileData = {
    date: date,
    type: type,
    url: `${process.env.NODE_ENV === "development" ? process.env.URL_LOCAL : process.env.URL_PRODUCTION}/invoices/${fileName}`,
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