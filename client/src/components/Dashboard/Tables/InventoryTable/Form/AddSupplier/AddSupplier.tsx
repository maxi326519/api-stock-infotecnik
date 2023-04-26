import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Supplier, RootState } from "../../../../../../interfaces";

import SupplierForm from "../../../SupplierTable/Form/Form";

import style from "./AddSupplier.module.css";

interface Props {
  supplierSelected: Supplier | null;
  setSupplier: (selected: Supplier | null) => void;
  handleClose: () => void;
}

export default function AddSupplier({
  supplierSelected,  setSupplier,
  handleClose,
}: Props) {
  const suppliers: Supplier[] = useSelector(
    (state: RootState) => state.suppliers
  );
  const [rows, setRows] = useState<Supplier[]>([]);
  const [selected, setSelected] = useState<Supplier | null>(null);
  const [supplierForm, setSupplierForm] = useState<boolean>(false);

  useEffect(() => {
    setSelected(supplierSelected);
  }, [supplierSelected]);

  useEffect(() => {
    setRows(suppliers);
  }, [suppliers]);

  function handleSubmit(): void {
    setSupplier(selected);
    handleClose();
    console.log(selected);
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setRows(
      suppliers.filter((p: Supplier) => {
        if (value === "") return true;
        if (p.id.toString() === value) return true;
        if (p.nombre.toLowerCase().includes(value.toLowerCase())) return true;
        if (p.direccion.toLowerCase().includes(value.toLowerCase()))
          return true;
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
    if (selected?.id !== supplier.id) {
      setSelected(supplier);
    } else {
      // Si esta lo eliminamos
      setSelected(null);
    }
  }

  function handleSupplierForm() {
    setSupplierForm(!supplierForm);
  }

  return (
    <div className={style.container}>
      {supplierForm ? <SupplierForm handleForm={handleSupplierForm} /> : null}
      <div className={`toTop ${style.window}`}>
        <div className={style.close}>
          <h5>Seleccione un proveedor</h5>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={style.content}>
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
                    selected?.id === supplier.id ? style.selected : ""
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
            onClick={handleSupplierForm}
          >
            Crear nuevo
          </button>
        </div>
      </div>
    </div>
  );
}
