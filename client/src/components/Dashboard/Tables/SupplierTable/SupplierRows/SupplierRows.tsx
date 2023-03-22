import { useState } from "react";
import { Supplier } from "../../../../../interfaces";

import style from "./SupplierRows.module.css";

interface Props {
  supplier: Supplier;
}

export default function SupplieRows({ supplier }: Props) {
  const [isDisabled, setDisabled] = useState(true);

  function handleDisabled() {
    setDisabled(!isDisabled);
  }

  function handleRemove() {}

  return (
    <div className={style.row}>
      <input
        className="form-control"
        value={supplier.codigo}
        placeholder="Codigo"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={supplier.nombre}
        placeholder="Nombre"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={supplier.direccion}
        placeholder="Direccion"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={supplier.telefono}
        placeholder="Telefono"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={supplier.poblacion}
        placeholder="Poblacion"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={supplier.postal}
        placeholder="Postal"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={supplier.cifNif}
        placeholder="CIF NIF"
        disabled={isDisabled}
      />
      <button
        className="btn btn-success"
        type="button"
        onClick={handleDisabled}
      >
        Editar
      </button>
      <button className="btn btn-success" type="button" onClick={handleRemove}>
        Eliminar
      </button>
    </div>
  );
}
