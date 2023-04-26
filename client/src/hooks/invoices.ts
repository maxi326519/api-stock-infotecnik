import { useEffect, useState } from "react";
import { Invoices, TotalDetail, initInvoice } from "../interfaces";
import { useDispatch } from "react-redux";
import {
  postInvoice as postInvoiceAction,
  postServiceInvoice,
} from "../redux/actions/invoices";

export default function useInvoice() {
  const dispatch = useDispatch();
  const [invoice, setInvoice] = useState<Invoices>(initInvoice);
  const [details, setDetails] = useState<TotalDetail[]>([]);

  useEffect(() => {
    /* Total calculate */
  }, [invoice]);

  function postInvoice() {
    const newInvoice = {
      ...invoice,
      TotalDetails: details,
    };

    console.log(newInvoice);
    if (invoice.tipo === "Stock") {
      return dispatch<any>(postInvoiceAction(invoice));
    } else {
      return dispatch<any>(
        postServiceInvoice({
          ...invoice,
          TotalDetails: invoice.TotalDetails.map((details) => {
            const { id, ...rest } = { ...details };
            return rest;
          }),
        })
      );
    }
  }

  function resetInvoice() {
    setInvoice(initInvoice);
  }

  function addDetail(detail: TotalDetail) {
    let newId: string = details.length.toString();

    while (details.some((d: TotalDetail) => d.id === newId)) {
      newId = `${Number(newId) + 1}`;
    }

    setDetails([
      ...details,
      {
        ...detail,
        id: newId,
      },
    ]);
  }

  function changeDetail(
    detailId: string,
    name: string,
    value: string | number
  ) {
    setDetails(
      details.map((detail: TotalDetail) => {
        if (detail.id === detailId) {
          return {
            ...detail,
            [name]: value,
          };
        } else return detail;
      })
    );
  }

  function removeDetails(detailId: string) {
    setDetails(details.filter((detail) => detail.id !== detailId));
  }

  return {
    invoice,
    setInvoice,
    postInvoice,
    resetInvoice,
    details,
    addDetail,
    removeDetails,
    changeDetail,
  };
}
