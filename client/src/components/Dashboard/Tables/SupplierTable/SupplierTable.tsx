import { useEffect, useState } from "react";
import { RootState, Supplier } from "../../../../interfaces";
import { useSelector } from "react-redux";

import SupplierRows from "./SupplierRows/SupplierRows";
import Form from "./Form/Form";

import style from "./SupplierTable.module.css";
import add from "../../../../assets/svg/add.svg";

/* interface Rows {
  suppliers: Array<[Supplier]>
} */

export default function SupplierTable() {
  const supplier = useSelector((state: RootState) => state.suppliers);
  const [rows, setRows] = useState<any>([]);
  const [form, setForm] = useState(false);

  useEffect(() => {
    setRows(supplier);
  }, [supplier]);

  function handleForm(): void {
    setForm(!form);
  }

  return (
    <div className={`toLeft ${style.dashboardList}`}>
      {form ? <Form handleForm={handleForm} /> : null}
      <h3>Proveedores</h3>
      <div className={style.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar proveedor"
        />
        <button className="btn btn-success" type="button" onClick={handleForm}>
          <img src={add} alt="add" />
          <span>Nuevo proveedor</span>
        </button>
      </div>
      <div className={style.dashboardList__grid}>
        <div className={`${style.row} ${style.firstRow}`}>
          <span>Numero</span>
          <span>Nombre</span>
          <span>Direccion</span>
          <span>Telefono</span>
          <span>CP</span>
          <span>Poblacion</span>
          <span>CIF / NIF</span>
          <span>Editar</span>
          <span>Eliminar</span>
        </div>
        <div className={style.contentCard}>
          {rows.length <= 0 ? (
            <div className={style.listEmpty}>
              <span>No hay Proveedores</span>
            </div>
          ) : (
            rows?.map((supplier: Supplier) => (
              <SupplierRows key={supplier.id} supplier={supplier} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
