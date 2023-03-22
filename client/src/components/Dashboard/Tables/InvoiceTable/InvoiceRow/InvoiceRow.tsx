import { Invoices } from "../../../../../interfaces";
import style from "./InvoiceRow.module.css";

import products from "../../../../../assets/svg/products.svg";
import supplier from "../../../../../assets/svg/supplier.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";

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
        <img src={products} alt="products" />
      </button>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => handleSupplier(invoice.SuipplierId)}
      >
        <img src={supplier} alt="supplier" />
      </button>
      <button
        className="btn btn-danger"
        type="button"
        onClick={() => handleSupplier(invoice.id)}
      >
        <img src={deleteSvg} alt="delete" />
      </button>
      <span></span>
    </div>
  );
}
