import { Transactions } from "../../../../../interfaces";
import style from "./TransactionsRow.module.css";

interface Props {
  transaction: Transactions;
  handleInvoice: (invoiceid: string) => void;
}

export default function TransactionsRow({ transaction, handleInvoice }: Props) {
  return (
    <div className={style.row}>
      <span>{transaction.fecha}</span>
      <span>{transaction.fechaValor}</span>
      <span>{transaction.movimiento}</span>
      <span>{transaction.datos}</span>
      <span>{transaction.importe}</span>
      <span>{transaction.saldo}</span>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => handleInvoice(transaction.InvoiceId)}
      >
        Factura
      </button>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => handleInvoice(transaction.InvoiceId)}
      >
        Vincular
      </button>
      <button
        className="btn btn-danger"
        type="button"
        onClick={() => handleInvoice(transaction.InvoiceId)}
      >
        -
      </button>
      <span></span>
    </div>
  );
}
