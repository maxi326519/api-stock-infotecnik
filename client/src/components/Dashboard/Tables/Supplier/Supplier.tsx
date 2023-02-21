import { useState } from "react";

import styles from "../../Dashboard.module.css";
import style from "./Supplier.module.css";

export default function Supplier() {
  const [rows, setRows] = useState([]);
  return (
    <div className={styles.dashboardList}>
      <h3>Listado de proveedores</h3>
      <div className={styles.dashboardList__searchBar}>
        <input className="form-control" placeholder="Buscar proveedor" />
        <button className="btn btn-primary">
          <span>Agregar proveedor</span>
        </button>
      </div>
      <div className={styles.dashboardList__grid}>
        <div className={`${style.card} ${styles.firstrow}`}>
          <span>Codigo</span>
          <span>Nombre</span>
          <span>Direccion</span>
          <span>CP y Poblacion</span>
          <span>CIF / NIF</span>
          <span>Editar</span>
          <span>Eliminar</span>
        </div>
        <div className={styles.contentCard}>
          {rows.length <= 0 ? (
            <div className={styles.listEmpty}>
              <span>No hay Proveedores</span>
              <span>¿Quieres agregar uno?</span>
              <button className="btn btn-primary">
                <span>Agregar proveedor</span>
              </button>
            </div>
          ) : (
            rows?.map((b) => <h2>hola</h2>)
          )}
        </div>
      </div>
    </div>
  );
}
