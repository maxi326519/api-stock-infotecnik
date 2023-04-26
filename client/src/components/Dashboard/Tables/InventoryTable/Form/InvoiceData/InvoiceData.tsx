import { useEffect, useRef } from "react";
import { Invoices, TipoImpositivo } from "../../../../../../interfaces";

import styles from "./InvoiceData.module.css";

interface InvoiceError {
  numero: string;
  archivo: string;
}

interface Props {
  invoice: Invoices;
  error: InvoiceError;
  handleChange: (name: string, value: string | number | boolean) => void;
  file: File | undefined;
  setFile: (file: File) => void;
}

export default function InvoiceData({
  invoice,
  error,
  handleChange,
  file,
  setFile,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [file]);

  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.checked;

    handleChange(name, value);
  }

  function handleLocalChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const name = event.target.name;

    handleChange(name, value);
  }

  function handleLocalSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    handleChange(event.target.name, event.target.value);
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) setFile(file);
  }

  return (
    <div className={styles.container}>
      <h5>Factura</h5>
      <div className={styles.data}>
        <div className="form-floating">
          <input
            id={error.archivo ? "floatingInputInvalid" : "numero"}
            name="numero"
            className={`form-control ${!error.numero ? "" : "is-invalid"}`}
            type="number"
            value={invoice.numero}
            onChange={handleLocalChange}
          />
          <label htmlFor="numero" className="form-label">
            Numero
          </label>
          <small>{error.numero}</small>
        </div>

        <div className="form-floating">
          <input
            id="fecha"
            name="fecha"
            className="form-control"
            type="date"
            max={new Date().toISOString().split("T")[0]}
            value={invoice.fecha}
            onChange={handleLocalChange}
          />
          <label htmlFor="fecha" className="form-label">
            Fecha
          </label>
        </div>

        <div className="form-floating">
          <select
            id="tipoImpositivo"
            name="tipoImpositivo"
            className="form-control"
            value={invoice.tipoImpositivo}
            onChange={handleLocalSelect}
          >
            <option value={TipoImpositivo.IVA}>IVA</option>
            <option value={TipoImpositivo.Recargo}>Recargo</option>
            <option value={TipoImpositivo.REBU}>REBU</option>
          </select>
          <label htmlFor="tipoImpositivo" className="form-label">
            Tipo Impositivo:
          </label>
        </div>

        <div className={styles.pending}>
          <input
            id="pendiente"
            name="pendiente"
            type="checkbox"
            checked={invoice.pendiente}
            className="btn btn-success"
            onChange={handleCheck}
          />
          <label htmlFor="pendiente">Pendiente</label>
        </div>

        <div className="form-floating">
          <input
            id={error.archivo ? "floatingInputInvalid" : "archivo"}
            name="archivo"
            className={`form-control ${!error.archivo ? "" : "is-invalid"}`}
            type="file"
            placeholder="archivo"
            onChange={handleFile}
            ref={inputRef}
            disabled={invoice.pendiente}
          />
          <small>{error.archivo}</small>
        </div>
      </div>
    </div>
  );
}
