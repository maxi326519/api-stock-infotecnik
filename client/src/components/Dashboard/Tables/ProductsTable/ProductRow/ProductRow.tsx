import { useState } from "react";
import { Product } from "../../../../../interfaces";

import style from "./ProductRow.module.css";
import details from "../../../../../assets/svg/details.svg";

interface Props {
  product: Product;
  handleDetails: () => void;
}

export default function ProductCard({ product, handleDetails }: Props) {

  return (
    <div className={style.row}>
      <input
        className="form-control"
        id="codigo"
        placeholder="Codigo"
        type="text"
        value={product.codigo}
        disabled={true}
      />
      <input
        className="form-control"
        id="marca"
        placeholder="Msarca"
        type="text"
        value={`${product.marca} / ${product.modelo} / ${product.color} / ${product.capacidad}`}
        disabled={true}
      />
      <input
        className="form-control"
        id="categoria"
        placeholder="Categoria"
        type="text"
        value={product.CategoryId}
        disabled={true}
      />
      <button className="btn btn-primary" type="button" onClick={handleDetails}>
        <img src={details} alt="details" />
      </button>
      <span></span>
    </div>
  );
}
