import { useState } from "react";
import { useSelector } from "react-redux";
import { Stock, RootState } from "../../../../../../interfaces";

import Row from "./Row/Row";

import styles from "./ProductData.module.css";
interface Props {
  productsSelected: string[];
  stock: Stock[];
  setStock: (stock: Stock[]) => void;
  tipoImpositivo: string; 
}

export default function ProductData({
  productsSelected,
  stock,
  setStock,
  tipoImpositivo
}: Props) {
  const products = useSelector((state: RootState) => state.products);
  const [list, setList] = useState();

  return (
    <div className={styles.productAdd}>
      <h5>Productos</h5>
      <div className={styles.list}>
        {productsSelected.map((p) => {
          return (
            <Row product={p} tipoImpositivo={tipoImpositivo}/>
          );
        })}
      </div>
    </div>
  );
}
