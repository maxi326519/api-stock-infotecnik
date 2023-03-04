import React from "react";
import { useState } from "react";

import styles from "../../Dashboard.module.css";
import style from "./InvoiceTable.module.css";

export default function InvoiceTable() {
  const [rows, setRows] = useState([]);

  return (
    <div className={styles.dashboardList}>
      <h3>Facturas</h3>
      <div className={styles.dashboardList__searchBar}>
        <input className="form-control" type="search"  placeholder="Buscar cliente" />
        <button className="btn btn-primary" type="button" >
          <span>Facturas</span>
        </button>
      </div>
      <div className={styles.dashboardList__grid}>
        <div className={styles.clientCard}>
          <span>Tipo</span>
          <span>Nombre</span>
          <span>Email</span>
          <span>Direccion</span>
          <span>Telefono</span>
          <span>Editar</span>
          <span>Eliminar</span>
        </div>
        <div className={style.card}>
          {rows.length <= 0 ? (
            <div className={styles.listEmpty}>
              <span>No hay productos</span>
            </div>
          ) : (
            rows?.map((b) => <h2>hola</h2>)
          )}
        </div>
      </div>
    </div>
  );
}