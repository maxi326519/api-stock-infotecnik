import { useState } from "react";
import { Invoices, TipoImpositivo } from "../../../../../../interfaces";

import styles from "./InvoiceData.module.css";

interface Props {
  invoice: Invoices;
  setInvoice: (invoice: Invoices) => void;
}

export default function InvoiceData({ invoice, setInvoice }: Props) {
  const [pending, setpending] = useState<boolean>(false);

  function handleCheck() {
    setpending(!pending);
  }

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;

    if (Number(value) === TipoImpositivo.IVA) {
      setInvoice({ ...invoice, tipoImpositivo: TipoImpositivo.IVA });
    } else if (Number(value) === TipoImpositivo.REBU) {
      setInvoice({ ...invoice, tipoImpositivo: TipoImpositivo.REBU });
    } else if (Number(value) === TipoImpositivo.recargo) {
      setInvoice({ ...invoice, tipoImpositivo: TipoImpositivo.recargo });
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const name = event.target.name;

    setInvoice({ ...invoice, [name]: value });
  }

  return (
    <div className={styles.container}>
      <hr></hr>
      <h5>Factura</h5>
      <div className={styles.pending}>
        <input
          id="pending"
          type="checkbox"
          checked={pending}
          className="btn btn-success"
          onChange={handleCheck}
        />
        <label htmlFor="pending">Pendiente</label>
      </div>
      <div className={styles.data}>
        <div className="form-floating">
          <input
            id="nro"
            className="form-control"
            type="number"
            value={invoice.numero}
            onChange={handleChange}
          />
          <label htmlFor="nro" className="form-label">
            Numero
          </label>
        </div>

        <div className="form-floating">
          <input
            id="fecha"
            className="form-control"
            type="date"
            max={new Date().toISOString().split("T")[0]}
            value={invoice.fecha}
            onChange={handleChange}
          />
          <label htmlFor="fecha" className="form-label">
            Fecha
          </label>
        </div>

        <div className="form-floating">
          <input
            id="factura"
            className="form-control"
            type="number"
            disabled={pending}
            value={invoice.archivo}
            onChange={handleChange}
          />
          <label htmlFor="factura" className="form-label">
            URL
          </label>
        </div>

        <div className="form-floating">
          <select
            id="impositivo"
            className="form-control"
            value={invoice.tipoImpositivo}
            onChange={handleSelect}
          >
            <option value={TipoImpositivo.IVA}>IVA</option>
            <option value={TipoImpositivo.recargo}>Recargo</option>
            <option value={TipoImpositivo.REBU}>REBU</option>
          </select>
          <label htmlFor="impositivo" className="form-label">
            Tipo Impositivo:
          </label>
        </div>
      </div>
    </div>
  );
}
