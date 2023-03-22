import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, Product } from "../../../../interfaces";

import Form from "./Form/Form";
import Details from "./Details/Details";
import ProductRow from "./ProductRow/ProductRow";

import styles from "../../Dashboard.module.css";
import style from "./ProductsTable.module.css";

export default function ProductTable() {
  const products: Product[] = useSelector((state: RootState) => state.products);
  const [rows, setRows] = useState<any>([]);
  const [form, setForm] = useState(false);
  const [details, setDetails] = useState(false);

  useEffect(() => {
    setRows(products);
  }, [products]);

  function handleForm() {
    setForm(!form);
  }

  function handleDetails() {
    setDetails(!details);
  }

  return (
    <div className={styles.dashboardList}>
      {form ? <Form handleForm={handleForm} /> : null}
      {details ? (
        <Details product={products[0]} handleDetails={handleDetails} />
      ) : null}
      <h3>Poductos</h3>
      <div className={styles.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar producto"
        />
        <button className="btn btn-primary" type="button" onClick={handleForm}>
          Agregar producto
        </button>
      </div>
      <div className={styles.dashboardList__grid}>
        <div className={`${style.row} ${styles.firstrow}`}>
          <span>Codigo</span>
          <span>Descripcion</span>
          <span>Cateogria</span>
          <span>Detalle</span>
        </div>
        <div className={styles.contentCard}>
          {rows.length <= 0 ? (
            <div className={styles.listEmpty}>
              <span>No hay productos</span>
              <span>¿Quieres agregar uno?</span>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleForm}
              >
                Agregar producto
              </button>
            </div>
          ) : (
            rows?.map((product: Product) => (
              <ProductRow
                key={product.id}
                product={product}
                handleDetails={handleDetails}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
