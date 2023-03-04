import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Supplier, State } from "../../../../../../interfaces";

import style from "./AddSupplier.module.css";

interface Props {
  supplierSelected: number;
  setSupplier: (selected: number) => void;
  handleClose: () => void;
}

export default function AddSupplier({
  supplierSelected,
  setSupplier,
  handleClose,
}: Props) {
  const suppliers: Supplier[] = useSelector((state: State) => state.suppliers);
  const [rows, setRows] = useState<Supplier[]>([]);
  const [selected, setSelected] = useState<number>(0);

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
        if (p.name.toLowerCase().includes(value.toLowerCase())) return true;
        if (p.address.toLowerCase().includes(value.toLowerCase())) return true;
        if (p.poblation.toLowerCase().includes(value.toLowerCase()))
          return true;
        if (p.cifNif.toLowerCase().includes(value.toLowerCase())) return true;
        if (p.phone.toLowerCase().includes(value.toLowerCase())) return true;
        return false;
      })
    );
  }

  function handleSelect(
    event: React.MouseEvent<HTMLDivElement>,
    code: number
  ): void {
    // Verificamos si ya existe el producto en la lista
    if (selected !== code) {
      setSelected(code);
    } else {
      // Si existe lo eliminamos
      setSelected(0);
    }
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
                    selected === supplier.code ? style.selected : ""
                  }`}
                  onClick={(e) => handleSelect(e, supplier.code)}
                >
                  <span>{supplier.name}</span>
                  <span>{supplier.address}</span>
                  <span>{supplier.poblation}</span>
                  <span>{supplier.cifNif}</span>
                  <span>{supplier.phone}</span>
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
