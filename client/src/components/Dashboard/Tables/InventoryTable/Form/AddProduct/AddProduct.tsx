import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Product, State } from "../../../../../../interfaces";

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
        if (p.barCode.toLowerCase().includes(value.toLowerCase())) return true;
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

  function handleSelect(
    event: React.MouseEvent<HTMLDivElement>,
    barCode: string
  ): void {
    // Verificamos si ya existe el producto en la lista
    if (!selected.find((s) => s === barCode)) {
      const newSelect = rows.find(
        (r) => barCode.toLowerCase() === r.barCode.toLowerCase()
      );

      // Verificamos si no pudo encontrar nada
      if (newSelect !== undefined) {
        setSelected([...selected, newSelect.barCode]);
      }
    } else {
      // Si existe lo eliminamos
      setSelected(selected.filter((s) => s !== barCode));
    }
  }

  return (
    <div className={style.container}>
      <form className={style.window} onSubmit={handleSubmit}>
        <div className={style.searchBar}>
          <div>
            <button className="btn btn-danger" onClick={handleClose}>
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
              <span>Codigo</span>
              <span>Marca</span>
              <span>Modelo</span>
              <span>Color</span>
              <span>Capacidad</span>
            </div>
            <div>
              {rows?.map((p: Product) => (
                <div
                  className={`${style.row} ${
                    selected.find((s) => s === p.barCode) ? style.selected : ""
                  }`}
                  onClick={(e) => handleSelect(e, p.barCode)}
                >
                  <span>{p.barCode}</span>
                  <span>{p.marca}</span>
                  <span>{p.modelo}</span>
                  <span>{p.color}</span>
                  <span>{p.capacidad}</span>
                  <span>{p.estado}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="btn btn-success" type="submit">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
