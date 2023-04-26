import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Product, RootState } from "../../../../../../interfaces";

import ProductForm from "../../../ProductsTable/Form/Form";

import style from "./AddProduct.module.css";

interface Props {
  productsSelected: string[];
  setProduct: (selected: string[]) => void;
  handleClose: () => void;
  handleTemporal: () => void;
}

export default function AddProduct({
  productsSelected,
  setProduct,
  handleClose,
  handleTemporal,
}: Props) {
  const products: Product[] = useSelector((state: RootState) => state.products);
  const [rows, setRows] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [productForm, setProductForm] = useState<boolean>(false);

  useEffect(() => {
    setSelected(productsSelected);
  }, [productsSelected]);

  useEffect(() => {
    setRows(products);
  }, [products]);

  function handleSubmit(): void {
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
        if (p.descLarga.toLowerCase().includes(value.toLowerCase()))
          return true;
        if (p.descCorta.toLowerCase().includes(value.toLowerCase()))
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

  function handleProductForm() {
    setProductForm(!productForm);
  }

  return (
    <div className={style.container}>
      {productForm ? <ProductForm handleForm={handleProductForm} /> : null}
      <div className={`toTop ${style.window}`}>
        <div className={style.close}>
          <h5>Seleccione los productos</h5>
          <div className="btn-close" onClick={handleClose} />
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
                  <span>{p.codigo}</span>
                  <span>{p.marca}</span>
                  <span>{p.modelo}</span>
                  <span>{p.color}</span>
                  <span>{p.capacidad}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={style.btnContainer}>
          <button
            className="btn btn-success"
            type="button"
            onClick={handleSubmit}
          >
            Agregar
          </button>
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleTemporal}
          >
            Temporal
          </button>
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleProductForm}
          >
            Crear nuevo
          </button>
        </div>
      </div>
    </div>
  );
}
