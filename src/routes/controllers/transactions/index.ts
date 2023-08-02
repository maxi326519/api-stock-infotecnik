import { Op } from "sequelize";
import { Transaction, InvoiceFile } from "../../../db/index";

interface TransactionData {
  fecha: Date;
  fechaValor: string;
  movimiento: string;
  masDatos: string;
  importe: number;
  saldo: number;
}

const setTransactions = async (data: any[]) => {
  let response: any = [];
  let existingTransactions: any[] = [];

  for (let indice in data) {
    const newTransaction = {
      ...data[indice],
      fecha: new Date(data[indice].fecha),
      importe: Number(data[indice].importe.toFixed(2)),
      saldo: Number(data[indice].saldo.toFixed(2)),
    };

    const search = {
      fecha: newTransaction.fecha,
      importe: newTransaction.importe,
      saldo: newTransaction.saldo,
    };
    const isDuplicate = existingTransactions.some((transaction) => {
      return (
        transaction.fecha.getTime() === newTransaction.fecha.getTime() &&
        transaction.importe === newTransaction.importe &&
        transaction.saldo === newTransaction.saldo
      );
    });

    if (!isDuplicate) {
      const currentTransaction = await Transaction.findOne({
        where: search,
      });

      if (!currentTransaction) {
        response.push(await Transaction.create(newTransaction));
      }
      existingTransactions.push(newTransaction);
    }
  }

  return response;
};


const getTransactions = async (
  from: string,
  to: string,
  linked: string | undefined
) => {
  // Where
  let whereClause: any = {
    fecha: {
      [Op.between]: [new Date(from), new Date(to)],
    },
  };

  // Linked to invoice
  if (linked === "true") {
    whereClause.vinculada = true;
  } else if (linked === "false") {
    whereClause.vinculada = false;
  }

  // Query
  const transactions = await Transaction.findAll({
    where: whereClause,
  });

  return transactions;
};

const deleteTransactions = async (transactionId: string) => {
  const transactionRef = await Transaction.findOne({
    where: { id: transactionId },
  });
  if (!transactionRef) throw new Error("transaction not found");

  await Transaction.destroy({
    where: { id: transactionId },
  });
};

const bindTransactionToInvoiceFile = async (transactions: Array<string>, invoiceFile: string) => {
    await InvoiceFile.findOne({
    where: { id: invoiceFile },
  });

  await Transaction.update(
    { vinculada: true },
    { where: { id: transactions, vinculada: false } }
  );

  await Transaction.update(
    { InvoiceFileId: invoiceFile },
    { where: { id: transactions } }
  );

  return "Transactions bound and updated successfully.";
};


const updateTransaction = async (data: TransactionData): Promise<string> => {
  const fechaDate = new Date(data.fecha);

  await Transaction.update(
    {
      fecha: fechaDate,
      fechaValor: data.fechaValor,
      movimiento: data.movimiento,
      masDatos: data.masDatos,
      importe: data.importe,
      saldo: data.saldo,
    },
    {
      where: {
        id: Transaction,
      },
    }
  );

  return "Transaction updated successfully.";
};







export { setTransactions, getTransactions, deleteTransactions, bindTransactionToInvoiceFile, updateTransaction };
