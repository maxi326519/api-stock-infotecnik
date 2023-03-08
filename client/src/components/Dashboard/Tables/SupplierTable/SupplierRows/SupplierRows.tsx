import { Supplier } from "../../../../../interfaces";

import style from "./SupplierRows.module.css";

interface Props {
  supplier: Supplier;
}

export default function SupplieRows({ supplier }: Props) {
  return (
    <div className={style.supplier}>
      <input value={supplier.code} placeholder="Codigo"/>
      <input value={supplier.nombre} placeholder="Nombre"/>
      <input value={supplier.direccion} placeholder="Direccion"/>
      <input value={supplier.telefono} placeholder="Telefono"/>
      <input value={supplier.poblacion} placeholder="Poblacion"/>
      <input value={supplier.postal} placeholder="Postal"/>
      <input value={supplier.cifNif} placeholder="CIF NIF"/>
      <button className="btn btn-success" type="button">Editar</button>
      <button className="btn btn-success" type="button">Eliminar</button>
    </div>
  );
}
