import React, { useEffect } from "react";
import { useState } from "react";
import { Invoices, RootState, Supplier } from "../../../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLoading,
  loading,
} from "../../../../redux/actions/loading/loading";
import { deleteInvoice } from "../../../../redux/actions/invoices";

import Form from "./Form/Form";
import SupplierDetails from "./SupplierDetails/SupplierDetails";
import InvoiceRow from "./InvoiceRow/InvoiceRow";

import style from "./InvoiceTable.module.css";
import add from "../../../../assets/svg/add.svg";
import swal from "sweetalert";

export default function InvoiceTable() {
  const invoices = useSelector((state: RootState) => state.invoices);
  const suppliers = useSelector((state: RootState) => state.suppliers);
  const dispatch = useDispatch();
  const [rows, setRows] = useState<Invoices[]>([]);
  const [search, setSearch] = useState<string>("");
  const [form, setForm] = useState(false);
  const [supplierSelected, setSupplierSelected] = useState<Supplier | null>();

  useEffect(() => {
    const filter = invoices.filter(() => {
      if (search === "") return true;
      return true;
    });
    setRows(filter);
  }, [invoices, search]);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearch(value);
  }

  function handleDelete(invoiceId: string) {
    console.log(invoiceId);
    swal({
      title: "Atención",
      text: "¿Seguro que desea eliminar esta factura? \n Este proceso es irreversible",
      icon: "warning",
      buttons: {
        Aceptar: true,
        Cancelar: true,
      },
    }).then((response: any) => {
      console.log(response);
      if (response === "Aceptar") {
        dispatch(loading());
        dispatch<any>(deleteInvoice(invoiceId))
          .then(() => {
            dispatch(closeLoading());
            swal("Eliminado", "Se eliminó la factura correctamente", "success");
          })
          .catch((err: any) => {
            dispatch(closeLoading());
            console.log(err);
            swal(
              "Error",
              "Hubo un error al elimnar la factura, intentalo más tarde",
              "error"
            );
          });
      }
    });
  }

  function handleForm(): void {
    setForm(!form);
  }

  function handleStock() {}

  function handleSupplierDetails() {
    setSupplierSelected(null);
  }

  function handleSetSupplier(supplierId: string) {
    const supplier = suppliers.find((sup) => sup.id === supplierId);
    console.log(supplier);
    if (supplier) setSupplierSelected(supplier);
  }

  return (
    <div className={`toLeft ${style.dashboardList}`}>
      {form ? <Form handleForm={handleForm} /> : null}
      {supplierSelected ? (
        <SupplierDetails
          supplier={supplierSelected}
          handleClose={handleSupplierDetails}
        />
      ) : null}
      <h3>Facturas</h3>
      <div className={style.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar factura"
          onChange={handleSearchChange}
        />
        <button className="btn btn-success" type="button" onClick={handleForm}>
          <img src={add} alt="add" />
          <span>Nueva Facturas</span>
        </button>
      </div>
      <div className={style.dashboardList__grid}>
        <div className={`${style.row} ${style.firstRow}`}>
          <span>Fecha</span>
          <span>Numero</span>
          <span>Archivo</span>
          <span>Tipo impositivo</span>
          <span>Total</span>
          <span>Productos</span>
          <span>Proveedor</span>
          <span>Eliminar</span>
        </div>
        <div className={style.contentCard}>
          {rows.length <= 0 ? (
            <div className={style.listEmpty}>
              <span>No hay facturas</span>
            </div>
          ) : (
            rows?.map((invoice: Invoices) => (
              <InvoiceRow
                key={invoice.id}
                invoice={invoice}
                handleStock={handleStock}
                handleSupplier={handleSetSupplier}
                handleDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
