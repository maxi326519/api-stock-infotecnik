import { Stock, Supplier } from "../../../../../interfaces";

import style from "./SupplierDetails.module.css";

interface Props {
  supplier: Supplier | undefined;
  handleClose: (stock: Stock | null) => void;
}

export default function SupplierDetails({ supplier, handleClose }: Props) {
  return (
    <div className={style.container}>
      <div className={style.details}>
        <div className={style.btnClose}>
          <h4>Datos del proveedor</h4>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => handleClose(null)}
          >
            x
          </button>
        </div>
        <div className={style.data}>
          <div className={style.dataGrid}>

            {/* CODGIO */}
            <div className="form-floating">
              <input
                className="form-control"
                id="codigo"
                type="text"
                value={supplier?.codigo}
                disabled={true}
              />
              <label className="form-label" htmlFor="codigo">
                Codigo
              </label>
            </div>

            {/* POSTAL */}
            <div className="form-floating">
              <input
                className="form-control"
                id="postal"
                type="text"
                value={supplier?.postal}
                disabled={true}
              />
              <label className="form-label" htmlFor="postal">
                Postal
              </label>
            </div>

            {/* NOMBRE */}
            <div className="form-floating">
              <input
                className="form-control"
                id="nombre"
                type="text"
                value={supplier?.nombre}
                disabled={true}
              />
              <label className="form-label" htmlFor="nombre">
                Nombre
              </label>
            </div>

            {/* DIRECCION */}
            <div className="form-floating">
              <input
                className="form-control"
                id="direccion"
                type="text"
                value={supplier?.direccion}
                disabled={true}
              />
              <label className="form-label" htmlFor="direccion">
                Direccion
              </label>
            </div>

            {/* POBLACION */}
            <div className="form-floating">
              <input
                className="form-control"
                id="poblacion"
                type="text"
                value={supplier?.poblacion}
                disabled={true}
              />
              <label className="form-label" htmlFor="poblacion">
                Poblacion
              </label>
            </div>

            {/* CIF\NIF */}
            <div className="form-floating">
              <input
                className="form-control"
                id="cifNif"
                type="text"
                value={supplier?.cifNif}
                disabled={true}
              />
              <label className="form-label" htmlFor="cifNif">
                CIF\NIF
              </label>
            </div>
          </div>

          {/* TELEFONO */}
          <div className="form-floating">
            <input
              className="form-control"
              id="telefono"
              type="text"
              value={supplier?.telefono}
              disabled={true}
            />
            <label className="form-label" htmlFor="telefono">
              Telefono
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
