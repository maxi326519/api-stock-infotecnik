import { Product } from "../../../../../interfaces";

import style from "./ProductRow.module.css";

interface Props {
  product: Product;
  handleDetails: () => void;
}

export default function ProductCard({ product, handleDetails }: Props) {
  return (
    <div className={style.row}>
      <span>{product.id}</span>
      <span>{`${product.marca} / ${product.modelo} / ${product.color} / ${product.capacidad}`}</span>
      <span>{product.categoria}</span>
      <button className="btn btn-success" type="button" onClick={handleDetails} >detalle</button>
      <span></span>
    </div>
  );
}
