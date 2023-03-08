import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Product, State } from "../../../../../../interfaces";

import Temporal from "../Temporal/Temporal";

import style from "./AddProduct.module.css";

interface Props {
  productsSelected: string[];
  setProduct: (selected: string[]) => void;
  handleClose: () => void;
}

export default function AddProduct({
  productsSelected,
  setProduct,
  handleClose,
}: Props) {
  const products: Product[] = useSelector((state: State) => state.products);
  const [rows, setRows] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [temporal, setTemporal] = useState<boolean>(false);

  useEffect(() => {
    setSelected(productsSelected);
  }, []);

  useEffect(() => {
    setRows(products);
  }, [products]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setProduct(selected);
    handleClose();
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    setRows(
      products.filter((p: Product) => {
        if (value === "") return true;
        if (p.id.toLowerCase().includes(value.toLowerCase())) return true;
        if (p.modelo.toLowerCase().includes(value.toLowerCase())) return true;
        if (p.marca.toLowerCase().includes(value.toLowerCase())) return true;
        if (p.color.toLowerCase().includes(value.toLowerCase())) return true;
        if (p.descripcionLarga.toLowerCase().includes(value.toLowerCase()))
          return true;
        if (p.descripcionCorta.toLowerCase().includes(value.toLowerCase()))
          return true;
        return false;
      })
    );
  }

  function handleSelect(id: string): void {
    // Verificamos si ya existe el producto en la lista
    if (!selected.find((s) => s.toLowerCase() === id.toLowerCase())) {
      const newSelect = rows.find(
        (r) => id.toLowerCase() === r.id.toLowerCase()
      );

      // Verificamos si no pudo encontrar nada
      if (newSelect !== undefined) {
        setSelected([...selected, newSelect.id]);
      }
    } else {
      // Si existe lo eliminamos
      setSelected(selected.filter((s) => s !== id));
    }
  }

  function handleTemporal() {
    setTemporal(!temporal);
  }

  return (
    <div className={style.container}>
      {temporal ? <Temporal handleClose={handleTemporal} /> : null}
      <form className={style.window} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Productos</h4>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <div className={style.searchData}>
          <div className={style.search}>
            <label htmlFor="search"></label>
            <input
              className="form-control"
              id="search"
              type="search"
              placeholder="Buscar un producto"
              onChange={handleSearch}
            />
            <button className="btn btn-success" type="button" onClick={handleTemporal}>
              Temporal
            </button>
          </div>

          <div className={style.table}>
            <div className={style.firstRow}>
              <span>Codigo</span>
              <span>Marca</span>
              <span>Modelo</span>
              <span>Color</span>
              <span>Capacidad</span>
            </div>
            <div className={style.data}>
              {rows?.map((p: Product) => (
                <div
                  className={`${style.row} ${
                    selected.find((s) => s === p.id) ? style.selected : ""
                  }`}
                  onClick={() => handleSelect(p.id)}
                >
                  <span>{p.id}</span>
                  <span>{p.marca}</span>
                  <span>{p.modelo}</span>
                  <span>{p.color}</span>
                  <span>{p.capacidad}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className="btn btn-success" type="submit">
          Agregar
        </button>
      </form>
    </div>
  );
}
