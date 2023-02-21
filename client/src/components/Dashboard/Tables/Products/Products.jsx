import { useState } from "react";
import { useSelector } from "react-redux";

import Form from "./Form/Form";
import ProductCard from "./ProductCard/ProductCard";

import styles from "../../Dashboard.module.css";
import style from "./Products.module.css";

export default function Product() {
  const products = useSelector((state) => state.products);
  const [rows, setRows] = useState([
    {
      Marca: "Samsung",
      Modelo: "Fold",
      Color: "Geen",
      Capacidad: "264",
      DescripcionLarga: "sdasd",
      DescripcionCorta: "as",
      Imagen: "",
    },
  ]);
  const [form, setForm] = useState(false);

  function handleForm() {
    console.log(form);
    setForm(!form);
  }

  return (
    <div className={styles.dashboardList}>
      {form ? <Form handleForm={handleForm} /> : null}
      <h3>Listado de productos</h3>
      <div className={styles.dashboardList__searchBar}>
        <input className="form-control" placeholder="Buscar producto" />
        <button className="btn btn-primary" onClick={handleForm}>
          Agregar producto
        </button>
      </div>
      <div className={styles.dashboardList__grid}>
        <div className={`${style.card} ${styles.firstrow}`}>
          <span>Nro de serie</span>
          <span>Marca</span>
          <span>Modelo</span>
          <span>Color</span>
          <span>Capacidad</span>
          <span>Estado</span>
          <span>detalle</span>
{/*           <span>Descripcion larga</span>
          <span>Descripcion larga</span>
          <span>Imagen</span> */}
{/*           <span>editar</span>
          <span>eliminar</span> */}
        </div>
        <div className={styles.contentCard}>
          {rows.length <= 0 ? (
            <div className={styles.listEmpty}>
              <span>No hay productos</span>
              <span>¿Quieres agregar uno?</span>
              <button className="btn btn-primary" onClick={handleForm}>
                Agregar producto
              </button>
            </div>
          ) : (
            rows?.map((b) => (
              <ProductCard
                Marca={rows.Marca}
                Modelo={rows.Modelo}
                Color={rows.Color}
                Capacidad={rows.Capacidad}
                DescripcionLarga={rows.DescripcionLarga}
                DescripcionCorta={rows.DescripcionCorta}
                Imagen={rows.Imagen}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
