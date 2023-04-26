import React, { useEffect } from "react";
import { useState } from "react";
import { RootState, Transactions } from "../../../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { postTransactions } from "../../../../redux/actions/transactions";
import {
  closeLoading,
  loading,
} from "../../../../redux/actions/loading/loading";
import swal from "sweetalert";

import TransactionsRow from "./TransactionsRow/TransactionsRow";
import ImportExcel from "./ImportExcel/ImportExcel";

import style from "./TransactionsTable.module.css";
import importSvg from "../../../../assets/svg/import.svg";

export default function TransactionsTable() {
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.transactions);
  const [rows, setRows] = useState<Transactions[]>([]);
  const [search, setSearch] = useState<string>("");
  const [transactionForm, setTransactionForm] = useState<boolean>(false);

  useEffect(() => {
    const filter = transactions.filter(() => {
      if (search === "") return true;
      return true;
    });
    setRows(filter);
  }, [transactions, search]);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearch(value);
  }

  function handleInvoice(): void {}

  function handleData(data: any) {
    dispatch(loading());
    dispatch<any>(postTransactions(data))
      .then(() => {
        handleClose();
        dispatch(closeLoading());
        swal("Guardado", "Se importaron sus movimientos con exito", "success");
      })
      .catch((err: any) => {
        console.log(err);
        dispatch(closeLoading());
        swal(
          "Error",
          "Error al guardar los movimientos, intentelo mas tarde",
          "error"
        );
      });
  }

  function handleClose(): void {
    setTransactionForm(!transactionForm);
  }

  return (
    <div className={`toLeft ${style.dashboardList}`}>
      {transactionForm ? (
        <ImportExcel handleData={handleData} handleClose={handleClose} />
      ) : null}
      <h3>Movimientos</h3>
      <div className={style.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar movimiento"
          onChange={handleSearchChange}
        />
        <button className="btn btn-success" type="button" onClick={handleClose}>
          <img src={importSvg} alt="importSvg" />
          <span>Importar</span>
        </button>
      </div>
      <div className={style.dashboardList__grid}>
        <div className={`${style.row} ${style.firstRow}`}>
          <span>Fecha</span>
          <span>Fecha Valor</span>
          <span>Movimiento</span>
          <span>Mas datos</span>
          <span>Importe</span>
          <span>Factura</span>
          <span>Vincular</span>
          <span>Eliminar</span>
        </div>
        <div className={style.contentCard}>
          {rows.length <= 0 ? (
            <div className={style.listEmpty}>
              <span>No hay movimientos</span>
            </div>
          ) : (
            rows?.map((transaction: Transactions) => (
              <TransactionsRow
                key={transaction.id}
                transaction={transaction}
                handleInvoice={handleInvoice}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
