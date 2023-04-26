import { Transactions } from "../../../../../interfaces";
import style from "./TransactionsRow.module.css";

import invoice from "../../../../../assets/svg/invoices.svg";
import link from "../../../../../assets/svg/link.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";

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
      <span>{transaction.masDatos}</span>
      <span>{transaction.importe}</span>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => handleInvoice(transaction.InvoiceId)}
      >
        <img src={invoice} alt="invoice" />
      </button>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => handleInvoice(transaction.InvoiceId)}
      >
        <img src={link} alt="link" />
      </button>
      <button
        className="btn btn-danger"
        type="button"
        onClick={() => handleInvoice(transaction.InvoiceId)}
      >
        <img src={deleteSvg} alt="delete" />
      </button>
      <span></span>
    </div>
  );
}
