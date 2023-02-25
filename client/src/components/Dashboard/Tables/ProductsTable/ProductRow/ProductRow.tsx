import { Product } from "../../../../../interfaces";

import style from "./ProductRow.module.css";

interface Props {
  product: Product;
  handleDetails: () => void;
}

export default function ProductCard({ product, handleDetails }: Props) {
  return (
    <div className={style.row}>
      <span>{product.marca}</span>
      <span>{product.modelo}</span>
      <span>{product.color}</span>
      <span>{product.capacidad}</span>
      <span>{product.estado}</span>
      <button onClick={handleDetails}>detalle</button>
      <span></span>
    </div>
  );
}
