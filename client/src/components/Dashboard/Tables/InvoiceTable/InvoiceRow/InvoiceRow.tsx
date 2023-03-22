import { useEffect } from "react";
import { Invoices } from "../../../../../interfaces";
import style from "./InvoiceRow.module.css";

interface Props {
  invoice: Invoices;
  handleStock: (stockId: string) => void;
  handleSupplier: (stockId: string) => void;
}

export default function InvoiceRow({
  invoice,
  handleStock,
  handleSupplier,
}: Props) {

  return (
    <div className={style.row}>
      <span>{invoice.fecha}</span>
      <span>{invoice.numero}</span>
      <span>{invoice.archivo}</span>
      <span>{invoice.tipoImpositivo}</span>
      <span>Total</span>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => handleStock(invoice.SuipplierId)}
      >
        Productos
      </button>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => handleSupplier(invoice.SuipplierId)}
      >
        Proveedor
      </button>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => handleSupplier(invoice.id)}
      >
        Eliminar
      </button>
      <span></span>
    </div>
  );
}
