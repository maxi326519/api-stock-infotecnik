import { Op } from "sequelize";
import { Transaction, InvoiceFile } from "../../../db/index";
import { TransactionData } from "../../../interfaces/transactions";
import { error } from "console";

const setTransactions = async (data: any[]) => {
  let response: any = [];

  //Validations
  data.forEach((transaction: any) => {
    if (typeof transaction.fecha !== "string") throw new Error("missing parameter fecha");
    if (typeof transaction.fechaValor !== "string") throw new Error("missing parameter fechaValor");
    if (typeof transaction.importe !== "number") throw new Error("missing parameter importe");
    if (typeof transaction.saldo !== "number") throw new Error("missing parameter saldo");
  });

  // Iterate the transactions
  for (let indice in data) {
    // Create and formate every transactions
    const newTransaction = {
      ...data[indice],
      fecha: new Date(data[indice].fecha),
      importe: Number(data[indice].importe.toFixed(2)),
      saldo: Number(data[indice].saldo.toFixed(2)),
    };

    // Create 'search' to find the same data
    const search = {
      fecha: newTransaction.fecha,
      importe: newTransaction.importe,
      saldo: newTransaction.saldo,
    };

    // Find the same data
    const currentTransaction = await Transaction.findOne({
      where: search,
    });

    // If not duplicate save
    if (!currentTransaction) {
      response.push(await Transaction.create(newTransaction));
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

const bindTransactionToInvoiceFile = async (transactions: Array<string>, invoiceFile: string): Promise<string> => {
  const foundInvoiceFile = await InvoiceFile.findOne({
    where: { id: invoiceFile },
  });
   
  if(!foundInvoiceFile) throw Error("NoFound foundInvoiceFile")

  for (const transactionId of transactions) {
    const foundTransaction: any = await Transaction.findOne({
      where: { id: transactionId },
  
    });

    if (foundTransaction) {
      await foundTransaction.update(
        { vinculada: true },
      );
      await foundTransaction.setInvoiceFile(foundInvoiceFile);
      
    }else {
      throw Error("transactionsNofound")
    }
  }
   
  return "Successfully linked transactions.";
};

const updateTransaction = async (data: TransactionData): Promise<void> => {

  // Validations
  if (typeof data.id !== "string") throw new Error("missing parameter id");
  if (typeof data.fecha !== "string") throw new Error("missing parameter fecha");
  if (typeof data.fechaValor !== "string") throw new Error("missing parameter fechaValor");
  if (typeof data.importe !== "number") throw new Error("missing parameter importe");
  if (typeof data.saldo !== "number") throw new Error("missing parameter saldo");

  // 'Fecha' from string to Date
  const fechaDate = new Date(data.fecha);

  // Update transaction
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
        id: data.id,
      },
    }
  );
};


export { setTransactions, getTransactions, bindTransactionToInvoiceFile, updateTransaction, deleteTransactions };
