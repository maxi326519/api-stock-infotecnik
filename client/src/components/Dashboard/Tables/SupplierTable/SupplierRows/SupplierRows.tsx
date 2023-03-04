import { Supplier } from "../../../../../interfaces";

import style from "./SupplierRows.module.css";

interface Props {
  supplier: Supplier;
}

export default function SupplieRows({ supplier }: Props) {
  return (
    <div className={style.supplier}>
      <span>{supplier.code}</span>
      <span>{supplier.name}</span>
      <span>{supplier.address}</span>
      <span>{}</span>
      <span>{supplier.poblation}</span>
      <span>{}</span>
      <span>{supplier.cifNif}</span>
      <button>Editar</button>
      <button>Eliminar</button>
    </div>
  );
}
