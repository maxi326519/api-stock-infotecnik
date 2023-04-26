import { Stock, Supplier } from "../../../../../interfaces";

import style from "./SupplierDetails.module.css";

interface Props {
  supplier: Supplier | undefined;
  handleClose: () => void;
}

export default function SupplierDetails({ supplier, handleClose }: Props) {
  return (
    <div className={style.container}>
      <div className={`toTop ${style.details}`}>
        <div className={style.btnClose}>
          <h4>Datos del proveedor</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={style.data}>
          <div className={style.dataGrid}>
            {/* CODGIO */}
            <div className={style.dataContainer}>
              <span className={style.title}>Numero:</span>
              <span>{supplier?.numero}</span>
            </div>

            {/* POSTAL */}
            <div className={style.dataContainer}>
              <span className={style.title}>Postal:</span>
              <span>{supplier?.postal}</span>
            </div>

            {/* NOMBRE */}
            <div className={style.dataContainer}>
              <span className={style.title}>Nombre:</span>
              <span>{supplier?.nombre}</span>
            </div>

            {/* DIRECCION */}
            <div className={style.dataContainer}>
              <span className={style.title}>Direccion:</span>
              <span>{supplier?.direccion}</span>
            </div>

            {/* POBLACION */}
            <div className={style.dataContainer}>
              <span className={style.title}>Poblacion:</span>
              <span>{supplier?.poblacion}</span>
            </div>

            {/* CIF\NIF */}
            <div className={style.dataContainer}>
              <span className={style.title}>CIF\NIF:</span>
              <span>{supplier?.cifNif}</span>
            </div>
          </div>

          {/* TELEFONO */}
          <div className={style.dataContainer}>
            <span className={style.title}>Telefono:</span>
            <span>{supplier?.telefono}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
