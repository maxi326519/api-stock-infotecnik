import { useState } from "react";

import Form from "./Form/Form";

import styles from "../../Dashboard.module.css";
import style from "./BarCodes.module.css";

export default function BarCodes() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(false);

  function handleForm(): void {
    setForm(!form);
  }

  return (
    <div className={styles.dashboardList}>
      {form ? <Form handleForm={handleForm} /> : null}
      <h3>Listado de codigos de barra</h3>
      <div className={styles.dashboardList__searchBar}>
        <input className="form-control" placeholder="Buscar codigo de barras" />
        <button className="btn btn-primary" onClick={handleForm}>Nuevo codigo</button>
      </div>
      <div className={styles.dashboardList__grid}>
        <div className={`${style.card} ${styles.firstRow}`}>
          <span>Tipo</span>
          <span>Codigo</span>
          <span>Marca</span>
          <span>Modelo</span>
          <span>Color</span>
          <span>Capacidad</span>
          <span>Descripcion larga</span>
          <span>Descripcion larga</span>
          <span>Imagen</span>
          <span>editar</span>
          <span>eliminar</span>
        </div>
        <div className={styles.contentCard}>
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
