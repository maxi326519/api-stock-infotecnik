import { Supplier } from "../../../../../../interfaces";

import styles from "./SupplierData.module.css";

interface Props {
  supplier: Supplier;
}

export default function SupplierData({ supplier }: Props) {
  return (
    <div className={styles.container}>
      <hr></hr>
      <h5>Proveedor</h5>
      <div className={styles.data}>
        <div>
          <div className="form-floating">
            <input className="form-control" id="nombre" value={supplier.nombre}/>
            <label className="form-label" htmlFor="nombre">Nombre</label>
          </div>
          <div className="form-floating">
            <input className="form-control" id="direccion" type="text" value={supplier.direccion}/>
            <label className="form-label" htmlFor="direccion">Direccion</label>
          </div>
        </div>

        <div>
          <div className="form-floating">
            <input className="form-control" id="telefono" value={supplier.telefono}/>
            <label className="form-label" htmlFor="telefono">Telefono</label>
          </div>
          <div className="form-floating">
            <input className="form-control" id="cifNif" type="text" value={supplier.cifNif}/>
            <label className="form-label" htmlFor="cifNif">CIF / NIF</label>
          </div>
        </div>
      </div>
    </div>
  );
}
