import { Transaction } from "../../../db/index";

const setTransactions = async (data: any) => {
  if (!data.fecha) throw new Error("missing parameter (fecha)");
  if (!data.fechaValor) throw new Error("missing parameter (fechaValor)");
  if (!data.movimiento) throw new Error("missing parameter (movimiento)");
  if (!data.importe) throw new Error("missing parameter (importe)");

  const response = await Transaction.create(data);

  return response;
};

const getTransactions = async () => {
  const transactions = await Transaction.findAll();
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

export { setTransactions, getTransactions, deleteTransactions };
