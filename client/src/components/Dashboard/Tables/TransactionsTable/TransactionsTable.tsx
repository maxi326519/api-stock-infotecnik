import React, { useEffect } from "react";
import { useState } from "react";

import styles from "../../Dashboard.module.css";
import style from "./TransactionsTable.module.css";
import { RootState, Transactions } from "../../../../interfaces";
import { useSelector } from "react-redux";
import TransactionsRow from "./TransactionsRow/TransactionsRow";

export default function TransactionsTable() {
  const transactions = useSelector((state: RootState) => state.transactions);
  const [rows, setRows] = useState<Transactions[]>([]);
  const [search, setSearch] = useState<string>("");

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

  function handleInvoice() {}

  return (
    <div className={styles.dashboardList}>
      <h3>Movimientos</h3>
      <div className={styles.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar movimiento"
          onChange={handleSearchChange}
        />
        <button className="btn btn-primary" type="button">
          Importar
        </button>
      </div>
      <div className={styles.dashboardList__grid}>
        <div className={style.row}>
          <span>Fecha</span>
          <span>Fecha Valor</span>
          <span>Movimiento</span>
          <span>Mas datos</span>
          <span>Importe</span>
          <span>Saldo</span>
          <span className={style.buttons}>Factura</span>
          <span className={style.buttons}>Vincular</span>
          <span className={style.buttons}>Eliminar</span>
        </div>
        <div className={style.card}>
          {rows.length <= 0 ? (
            <div className={styles.listEmpty}>
              <span>No hay productos</span>
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
