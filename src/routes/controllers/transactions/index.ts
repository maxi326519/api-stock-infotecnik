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
    };

    const currentTransaction = await Transaction.findOne({
      where: {
        fechaValor: newTransaction.fechaValor,
        movimiento: newTransaction.movimiento,
        importe: newTransaction.importe,
        masDatos: newTransaction.masDatos,
        saldo: newTransaction.saldo.toFixed(2),
      },
    });

    if (currentTransaction) {
      console.log("transaction already exist");
    } else {
      console.log(currentTransaction);
      console.log("New:", newTransaction);
      response.push(await Transaction.create(newTransaction));
    }
  }
  console.log(response.length);
  return response;
};

const getTransactions = async (
  from: string,
  to: string,
  linked: string | undefined
) => {
  let whereClause: any = {
    fecha: {
      [Op.between]: [{ [Op.gte]: new Date(from) }, { [Op.lte]: new Date(to) }],
    },
  };

  if (linked === "true") {
    whereClause.vinculada = true;
  } else if (linked === "false") {
    whereClause.vinculada = false;
  }

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
