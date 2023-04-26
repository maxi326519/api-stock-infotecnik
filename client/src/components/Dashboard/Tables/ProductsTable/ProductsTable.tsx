import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, Product } from "../../../../interfaces";

import Form from "./Form/Form";
import Details from "./Details/Details";
import ProductRow from "./ProductRow/ProductRow";

import style from "./ProductsTable.module.css";
import add from "../../../../assets/svg/add.svg";

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
    <div className={`toLeft ${style.dashboardList}`}>
      {form ? (
        <Form
          handleForm={handleForm}
        />
      ) : null}
      {details ? (
        <Details product={products[0]} handleDetails={handleDetails} />
      ) : null}
      <h3>Poductos</h3>
      <div className={style.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar producto"
        />
        <button className="btn btn-success" type="button" onClick={handleForm}>
          <img src={add} alt="add" />
          <span>Nuevo producto</span>
        </button>
      </div>
      <div className={style.dashboardList__grid}>
        <div className={`${style.row} ${style.firstRow}`}>
          <span>Codigo</span>
          <span>Descripcion</span>
          <span>Cateogria</span>
          <span>Detalle</span>
        </div>
        <div className={style.contentCard}>
          {rows.length <= 0 ? (
            <div className={style.listEmpty}>
              <span>No hay productos</span>
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
