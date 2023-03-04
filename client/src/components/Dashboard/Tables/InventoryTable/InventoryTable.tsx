import { useState } from "react";
import { useSelector } from "react-redux";

import Form from "./Form/Form";

import styles from "../../Dashboard.module.css";
import style from "./InventoryTable.module.css";

export default function InventoryTable() {
  const products = useSelector((state: any) => state.products);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(false);

  function handleForm(): void {
    console.log(form);
    setForm(!form);
  }

  return (
    <div className={styles.dashboardList}>
      {form ? <Form handleForm={handleForm} /> : null}
      <h3>Inventario</h3>
      <div className={styles.dashboardList__searchBar}>
        <input className="form-control" type="search"  placeholder="Buscar inventario" />
        <button className="btn btn-primary" type="button"  onClick={handleForm}>
          Agregar inventario
        </button>
      </div>
      <div className={styles.dashboardList__grid}>
        <div className={`${style.card} ${styles.firstrow}`}>
          {/* Agregar codifo de stock */}
          <span>Codigo de barras</span> {/* codigo de un producto */}
          <span>Estado</span> {/* codigo de un producto */}
          <span>Nro de Serie</span> {/* codigo de un producto */}
          <span>Marca</span>
          <span>Modelo</span>
          <span>Familia</span>{/* Ponerlo en un solo campo, color, capacidad*/}
{/*           <span>Capacidad</span> */}
{/*           <span>Ref proveedor</span> */}
          <span>Precio</span>
          <span>Proveedor</span>
{/*           <span>Fecha de alta</span> */}
{/*           <span>Mas info</span> */}
          <span>detalle producto</span>
          
{/*           <span>Descripcion larga</span>
          <span>Descripcion larga</span>
          <span>Imagen</span> */}
{/*           <span>editar</span>
          <span>eliminar</span> */}
        </div>
        <div className={styles.contentCard}>
          {rows.length <= 0 ? (
            <div className={styles.listEmpty}>
              <span>No hay inventario</span>
              <span>¿Quieres agregar uno?</span>
              <button className="btn btn-primary" onClick={handleForm}>
                Agregar Inventario
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
