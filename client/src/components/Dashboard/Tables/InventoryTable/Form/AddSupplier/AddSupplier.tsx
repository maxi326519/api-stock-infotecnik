import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Supplier, RootState } from "../../../../../../interfaces";

import style from "./AddSupplier.module.css";

interface Props {
  supplierSelected: Supplier|null;
  setSupplier: (selected: Supplier|null) => void;
  handleClose: () => void;
}

export default function AddSupplier({
  supplierSelected,
  setSupplier,
  handleClose,
}: Props) {
  const suppliers: Supplier[] = useSelector((state: RootState) => state.suppliers);
  const [rows, setRows] = useState<Supplier[]>([]);
  const [selected, setSelected] = useState<Supplier|null>(null);

  useEffect(() => {
    setSelected(supplierSelected);
  }, []);

  useEffect(() => {
    setRows(suppliers);
  }, [suppliers]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setSupplier(selected);
    handleClose();
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setRows(
      suppliers.filter((p: Supplier) => {
        if (value === "") return true;
        if (p.code.toString() === value) return true;
        if (p.nombre.toLowerCase().includes(value.toLowerCase())) return true;
        if (p.direccion.toLowerCase().includes(value.toLowerCase())) return true;
        if (p.poblacion.toLowerCase().includes(value.toLowerCase()))
          return true;
        if (p.cifNif.toLowerCase().includes(value.toLowerCase())) return true;
        if (p.telefono.toLowerCase().includes(value.toLowerCase())) return true;
        return false;
      })
    );
  }

  function handleSelect(
    event: React.MouseEvent<HTMLDivElement>,
    supplier: Supplier
  ): void {
    // Verificamos si ya esta este proveedor
    if (selected?.code !== supplier.code) {
      setSelected(supplier);
    } else {
      // Si esta lo eliminamos
      setSelected(null);
    }
    console.log(selected);
  }

  return (
    <div className={style.container}>
      <form className={style.window} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Proveedor</h4>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <div className={style.searchData}>
          <div>
            <input
              id="search"
              className="form-control"
              type="search"
              placeholder="Buscar un proveedor"
              onChange={handleSearch}
            />
          </div>
          <div className={style.table}>
            <div className={style.firstRow}>
              <span>Nombre</span>
              <span>Direccion</span>
              <span>Poblacion</span>
              <span>CIF / NIF</span>
              <span>Telefono</span>
            </div>
            <div className={style.data}>
              {rows?.map((supplier: Supplier) => (
                <div
                  className={`${style.row} ${
                    selected?.code === supplier.code ? style.selected : ""
                  }`}
                  onClick={(e) => handleSelect(e, supplier)}
                >
                  <span>{supplier.nombre}</span>
                  <span>{supplier.direccion}</span>
                  <span>{supplier.poblacion}</span>
                  <span>{supplier.cifNif}</span>
                  <span>{supplier.telefono}</span>
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
