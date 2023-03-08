import { useState } from "react";
import { useSelector } from "react-redux";
import { Stock, State } from "../../../../../../interfaces";

import Row from "./Row/Row";

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

  return (
    <div className={styles.productAdd}>
      <h5>Productos</h5>
      <div className={styles.list}>
        {productsSelected.map((p) => {
          return (
            <Row product={p}/>
          );
        })}
      </div>
    </div>
  );
}
