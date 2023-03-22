import { useState } from "react";
import { useSelector } from "react-redux";
import { Stock, RootState, TipoImpositivo } from "../../../../../../interfaces";

import Row from "./Row/Row";

import styles from "./ProductData.module.css";
interface Props {
  productsSelected: string[];
  stock: Stock[];
  setStock: (stock: Stock[]) => void;
  tipoImpositivo: TipoImpositivo; 
}

export default function ProductData({
  productsSelected,
  stock,
  setStock,
  tipoImpositivo
}: Props) {
  return (
    <div className={styles.productAdd}>
      <h5>Productos</h5>
      <div className={styles.list}>
        {productsSelected.map((p) => {
          return (
            <Row id={p} tipoImpositivo={tipoImpositivo}/>
          );
        })}
      </div>
    </div>
  );
}
