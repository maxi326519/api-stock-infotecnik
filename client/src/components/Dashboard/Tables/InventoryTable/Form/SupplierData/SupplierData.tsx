import { Supplier } from "../../../../../../interfaces";

import styles from "./SupplierData.module.css";

interface Props {
  supplier: Supplier;
}

export default function SupplierData(/* { supplier }: Props */) {
  return (
    <div className={styles.container}>
      <hr></hr>
      <h5>Proveedor</h5>
      <div className={styles.data}>
{/*         <div className="form-floating">
          <div className={styles.rows}>
            <div className="form-floating">
              <input id="name" />
              <label id="name">Nombre</label>
            </div>
            <div className="form-floating">
              <input id="address">
              <label htmlFor="address">Direccion</label>
            </div>
          </div>
          <div>
            <div className="form-floating">
              <input />
              <label>Phone</label>
            </div>
            <div className="form-floating">
              <input />
              <label>CIF / NIF</label>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
