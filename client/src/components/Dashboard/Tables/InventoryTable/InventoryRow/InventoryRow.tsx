import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Product, RootState, Stock } from "../../../../../interfaces";

import style from "./InventoryRow.module.css";
import supplier from "../../../../../assets/svg/supplier.svg";
import details from "../../../../../assets/svg/details.svg";

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
  }, [products, stock]);

  return (
    <div className={style.row}>
      <span>{stock.codigoDeBarras}</span>
      <span>{stock.IMEISerie}</span>
      <span>{stock.estado}</span>
      <span>
        {`${product?.marca} / ${product?.modelo} / ${product?.color} / ${product?.capacidad}`}
      </span>
      <span>{stock.cantidad}</span>
      <span>{stock.precioSinIVA.toFixed(2)}</span>
      <span>{stock.precioIVA.toFixed(2)}</span>
      <span>{stock.precioIVAINC.toFixed(2)}</span>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => handleProveedor(stock)}
      >
        <img src={supplier} alt="supplier" />
      </button>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => handleDetails(stock)}
      >
        <img src={details} alt="details" />
      </button>
      <span></span>
    </div>
  );
}
