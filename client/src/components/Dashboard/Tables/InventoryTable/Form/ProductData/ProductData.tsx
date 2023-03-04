import { useState } from "react";
import { useSelector } from "react-redux";
import { Stock, State } from "../../../../../../interfaces";

import AddImages from "../AddImages/AddImages";
import img from "../../../../../assets/svg/image.svg";

import styles from "./ProductData.module.css";

interface Props {
  productsSelected: string[];
  stock: Stock[];
  setStock: (stock: Stock[]) => void;
}

export default function ProductData({
  productsSelected,
  stock,
  setStock,
}: Props) {
  const products = useSelector((state: State) => state.products);
  const [list, setList] = useState();
  const [imagesForm, setImagesForm] = useState(false);

  function handleClose(){
    setImagesForm(!imagesForm);
  }

  return (
    <div className={styles.productAdd}>
      {imagesForm ? <AddImages handleClose={handleClose}/> : null}
      <h5>Productos</h5>
      <div className={styles.list}>
        {productsSelected.map((p) => {
          return (
            <div className={styles.container}>
              <span>{p}</span>
              <div className={styles.item}>
                <div className="form-floating mb-3">
                  <select className="form-select" id="type" name="type">
                    <option>Code 128</option>
                    <option>Code 39</option>
                    <option>UPC-A</option>
                    <option>UPC-E</option>
                    <option>EAN-8</option>
                    <option>EAN-13</option>
                  </select>
                  <label htmlFor="type">.</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" id="code" name="code" />
                  <label htmlFor="code">Code</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" id="price" name="price" />
                  <label htmlFor="price">Precio </label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" id="priceIva" name="price" />
                  <label htmlFor="priceIva">Precio I.V.A.</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" id="sold" name="price" />
                  <label htmlFor="sold">Precio de venta</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" id="nroSerie" name="price" />
                  <label htmlFor="nroSerie">Nro de Serie/IMEI </label>
                </div>
                {/* {Agregar si es visible o no} */}
                <button className="btn btn-primary" type="button" onClick={handleClose}>
                  <img src={img} alt="img" />
                </button>
              </div>
              <button className="btn btn-primary" type="button">
                +
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
