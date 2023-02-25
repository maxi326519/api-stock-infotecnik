import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Product, State } from "../../../../../../interfaces";

import style from "./AddProduct.module.css";

interface Props {
  handleAddProduct: () => void;
}

export default function AddProduct({ handleAddProduct }: Props) {
  const products: Product[] = useSelector((state: State) => state.products);
  const [rows, setRows] = useState<Product[]>();

  useEffect(() => {
    setRows(products);
  }, [products]);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setRows(
      products.filter((p: Product) => {
        if (value === "") return true;
        if (value.toLocaleLowerCase() === p.barCode.toLocaleLowerCase()) return true;
        if (value.toLocaleLowerCase() === p.modelo.toLocaleLowerCase()) return true;
        if (value.toLocaleLowerCase() === p.marca.toLocaleLowerCase()) return true;
        if (value.toLocaleLowerCase() === p.color.toLocaleLowerCase()) return true;
        if (value.toLocaleLowerCase() === p.descripcionLarga.toLocaleLowerCase()) return true;
        if (value.toLocaleLowerCase() === p.descripcionCorta.toLocaleLowerCase()) return true;
        return false;
      })
    );
  }

  return (
    <div className={style.container}>
      <div className={style.window}>
        <div className={style.searchBar}>
          <div>
            <button className="btn btn-danger" onClick={handleAddProduct}>
              X
            </button>
          </div>
          <div>
            <label htmlFor="search"></label>
            <input
              id="search"
              placeholder="Buscar un producto"
              onChange={handleSearch}
            />
          </div>

          <div className={style.table}>
            <div className={`${style.row} ${style.firstRow}`}>
              <span>Marca</span>
              <span>Modelo</span>
              <span>Color</span>
              <span>Capacidad</span>
            </div>
            <div>
              {rows?.map((p: Product) => (
                <div className={style.row}>
                  <span>{p.marca}</span>
                  <span>{p.modelo}</span>
                  <span>{p.color}</span>
                  <span>{p.capacidad}</span>
                  <span>{p.estado}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
