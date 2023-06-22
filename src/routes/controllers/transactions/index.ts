import { Op } from "sequelize";
import { Transaction } from "../../../db/index";

const setTransactions = async (data: any[]) => {
  let response: any = [];
  for (let indice in data) {
    if (!data[indice].fecha) throw new Error("missing parameter (fecha)");
    if (!data[indice].fechaValor)
      throw new Error("missing parameter (fechaValor)");
    if (!data[indice].movimiento)
      throw new Error("missing parameter (movimiento)");
    if (!data[indice].importe) throw new Error("missing parameter (importe)");

    const newTransaction = {
      ...data[indice],
      fecha: new Date(data[indice].fecha),
      importe: Number(data[indice].importe.toFixed(2)),
      saldo: Number(data[indice].saldo.toFixed(2)),
    };

    const search = {
      fecha: newTransaction.fecha,
      movimiento: newTransaction.movimiento,
      importe: {
        [Op.between]: [
          newTransaction.importe - 0.01, // Menor límite del rango
          newTransaction.importe + 0.01, // Mayor límite del rango
        ],
      },
      masDatos: newTransaction.masDatos,
      saldo: {
        [Op.between]: [
          newTransaction.saldo - 0.01, // Menor límite del rango
          newTransaction.saldo + 0.01, // Mayor límite del rango
        ],
      },
    };
    const currentTransaction = await Transaction.findOne({
      where: search,
    });

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

export { setTransactions, getTransactions, deleteTransactions };
