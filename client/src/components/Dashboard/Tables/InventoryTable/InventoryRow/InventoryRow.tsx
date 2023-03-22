import { useEffect, useState } from "react";
import { Product, RootState, Stock } from "../../../../../interfaces";

import style from "./InventoryRow.module.css";
import { useSelector } from "react-redux";

interface Props {
  stock: Stock;
  handleProveedor: (stock: Stock | null) => void;
  handleDetails: (stock: Stock | null) => void;
}

export default function InventoryRow({
  stock,
  handleProveedor,
  handleDetails,
}: Props) {
  const products = useSelector((state: RootState) => state.products);
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const product = products.find((p) => p.id === stock.ProductId);
    if (product) {
      setProduct(product);
    }
  }, [product]);

  return (
    <div className={style.row}>
      <span>{stock.codigoDeBarras}</span>
      <span>{stock.status}</span>
      <span>{stock.status}</span>
      <span>
        {`${product?.marca} / ${product?.modelo} / ${product?.color} / ${product?.capacidad}`}
      </span>
      <span>{stock.precioSinIVA.toFixed(2)}</span>
      <span>{stock.precioIVA.toFixed(2)}</span>
      <span>{stock.precioIVAINC.toFixed(2)}</span>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => handleProveedor(stock)}
      >
        Proveedor
      </button>
      <button
        className="btn btn-success"
        type="button"
        onClick={() => handleDetails(stock)}
      >
        Detalle
      </button>
      <span></span>
    </div>
  );
}
