import { Invoices } from "../../../../../../interfaces";

import styles from "./InvoiceData.module.css";

interface Props {
  supplier: Invoices;
}

export default function InvoiceData(/* { supplier }: Props */) {
  return (
    <div className={styles.container}>
      <hr></hr>
      <h5>Factura</h5>
      <button className="btn btn-success" type="button">Pendiente</button>
      <div className={styles.data}>
        <div className="form-floating">
          <input id="nro" className="form-control" type="number" />
          <label htmlFor="nro" className="form-label">
            Numero
          </label>
        </div>

        <div className="form-floating">
          <input id="fecha" className="form-control" type="number" />
          <label htmlFor="fecha" className="form-label">
            Fecha
          </label>
        </div>

        <div className="form-floating">
          <input id="factura" className="form-control" type="number" />
          <label htmlFor="factura" className="form-label">
            URL
          </label>
        </div>

        <div className="form-floating">
          <select id="impositivo" className="form-control">
            <option value="IVA">IVA</option>
            <option value="Recargo">Recargo</option>
            <option value="Equivalencia">Equivalencia</option>
            <option value="REBU">REBU</option>
          </select>
          <label htmlFor="impositivo" className="form-label">
            Tipo Impositivo:
          </label>
        </div>
      </div>
    </div>
  );
}
