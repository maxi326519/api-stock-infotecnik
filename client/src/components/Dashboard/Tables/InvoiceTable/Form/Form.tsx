import { useDispatch, useSelector } from "react-redux";
import { useInvoice } from "../../../../../hooks";
import swal from "sweetalert";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";

import DetailsTable from "./DetailsTable/DetailsTable";

import style from "./Form.module.css";
import Categories from "./Categories/Categories";
import { useState } from "react";
import SupplierData from "./SupplierData/SupplierData";
import { RootState, Supplier } from "../../../../../interfaces";
import AddSupplier from "./AddSupplier/AddSupplier";
interface Props {
  handleForm: () => void;
}

export default function Form({ handleForm }: Props) {
  const {
    invoice,
    setInvoice,
    postInvoice,
    resetInvoice,
    details,
    addDetail,
    removeDetails,
    changeDetail,
  } = useInvoice();
  const dispatch = useDispatch();
  const suppliers = useSelector((state: RootState) => state.suppliers);
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [error, setError] = useState({
    SupplierId: "",
  });
  const [categories, setCategories] = useState<boolean>(false);
  const [supplierForm, setSupplierForm] = useState<boolean>(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(loading());
    postInvoice()
      .then(() => {
        handleClose();
        dispatch(closeLoading());
        swal("Guardado", "Se guardo la factura correctamente", "success");
      })
      .catch((err: any) => {
        dispatch(closeLoading());
        swal("Error", "Hubo un error al guardar la factura", "error");
        console.log(err);
      });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInvoice({ ...invoice, [event.target.name]: event.target.value });
  }

  function handleChangeCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
    setInvoice({ ...invoice, [event.target.name]: event.target.checked });
  }

  function handleSetSupplier(supplier: Supplier | null) {
    if (supplier) {
      setSupplier(supplier);
      setInvoice({ ...invoice, SupplierId: supplier.id });
    }
  }

  function handleClose(): void {
    resetInvoice();
    handleForm();
  }

  function handleCategories() {
    setCategories(!categories);
  }

  function handleFormSuppliers() {
    setSupplierForm(!supplierForm);
  }

  return (
    <div className={style.container}>
      {categories ? <Categories handleClose={handleCategories} /> : null}
      {supplierForm ? (
        <AddSupplier
          supplierSelected={supplier}
          setSupplier={handleSetSupplier}
          handleClose={handleFormSuppliers}
        />
      ) : null}
      <form className={`toTop ${style.form}`} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Nuevo cliente</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={style.inputs}>
          <div className="form-floating">
            <input
              id="fecha"
              className="form-control"
              name="fecha"
              type="date"
              value={invoice.fecha}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="fecha">
              Fecha
            </label>
            <small></small>
          </div>

          <div className="form-floating">
            <input
              id="numero"
              className="form-control"
              name="numero"
              type="text"
              value={invoice.numero}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="numero">
              Numero
            </label>
            <small></small>
          </div>

          <div className={style.category}>
            <div className={style.catContainer}>
              <span className={style.title}>Categoria</span>
              <span className={style.data}>{invoice.tipo}Luz</span>
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={handleCategories}
              >
                Seleccionar
              </button>
            </div>
            <small></small>
          </div>

          <div className="form-floating">
            <input
              id="total"
              className="form-control"
              name="total"
              type="number"
              value={invoice.total}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="total">
              Total
            </label>
            <small></small>
          </div>

          <DetailsTable
            details={details}
            addDetail={addDetail}
            removeDetails={removeDetails}
            changeDetail={changeDetail}
          />

          <div className={style.pending}>
            <input
              id="pendiente"
              name="pendiente"
              type="checkbox"
              checked={invoice.pendiente}
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="pendiente">Pendiente</label>
          </div>

          <div className="form-floating">
            <input
              id="archivo"
              className="form-control"
              name="archivo"
              type="file"
              value={invoice.archivo}
              onChange={handleChange}
              disabled={invoice.pendiente}
            />
            <label className="form-label" htmlFor="archivo">
              PDF
            </label>
            <small></small>
          </div>

          <SupplierData
            supplier={supplier}
            error={error.SupplierId}
            handleFormSuppliers={handleFormSuppliers}
          />
          <button className="btn btn-success" type="submit">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
