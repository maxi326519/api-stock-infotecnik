import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Supplier, State } from "../../../../../../interfaces";

import style from "./AddSupplier.module.css";

interface Props {
  handleAddSuppliers: () => void;
}

export default function AddSupplier({ handleAddSuppliers }: Props) {
  const suppliers: Supplier[] = useSelector((state: State) => state.suppliers);
  const [rows, setRows] = useState<Supplier[]>();

  useEffect(() => {
    setRows(suppliers);
  }, [suppliers]);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setRows(
      suppliers.filter((p: Supplier) => {
        if (value === "") return true;
        if (value === p.code.toString()) return true;
        if (value.toLocaleLowerCase() === p.name.toLocaleLowerCase())
          return true;
        if (value.toLocaleLowerCase() === p.address.toLocaleLowerCase())
          return true;
        if (value.toLocaleLowerCase() === p.poblation.toLocaleLowerCase())
          return true;
        if (value.toLocaleLowerCase() === p.cifNif.toLocaleLowerCase())
          return true;
        if (value.toLocaleLowerCase() === p.phone.toLocaleLowerCase())
          return true;
        return false;
      })
    );
  }

  return (
    <div className={style.container}>
      <div className={style.window}>
        <div className={style.searchBar}>
          <div>
            <button className="btn btn-danger" onClick={handleAddSuppliers}>
              X
            </button>
          </div>
          <div>
            <label htmlFor="search"></label>
            <input id="search" placeholder="Buscar un proveedor" />
          </div>
          <div className={style.table}>
            <div className={`${style.row} ${style.firstRow}`}>
              <span>Nombre</span>
              <span>Direccion</span>
              <span>Poblacion</span>
              <span>CIF / NIF</span>
              <span>Telefono</span>
            </div>
            <div>
              {rows?.map((p: Supplier) => (
                <div className={style.row}>
                  <span>{p.name}</span>
                  <span>{p.address}</span>
                  <span>{p.poblation}</span>
                  <span>{p.cifNif}</span>
                  <span>{p.phone}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
