import { useState } from "react";
import { useDispatch } from "react-redux";
import { postInventory } from "../../../../../redux/actions";
import {
  Inventory,
  tipoImpositivo,
  BarCode
} from "../../../../../interfaces";

import AddProduct from "./AddProduct/AddProduct";
import AddSupplier from "./AddSupplier/AddSupplier";

import style from "./Form.module.css";
import swal from "sweetalert";

interface Props {
  handleForm: () => void;
}

export default function Form({ handleForm }: Props) {
  const initialState: Inventory = {
    barCode: "",
    supplier: 0,
    product: 0,
    price: 0,
    amount: 0,
    invoiceNumber: 0,
    invoiceFile: "",
    tipoImpositivo: tipoImpositivo.IVA,
    precioCompraIVA: 0,
    precioCompraSIVA: 0,
    precioVentaIVA: 0,
  };

  const [inventory, setInventory] = useState<Inventory>(initialState);
  const [addProducts, setProducts] = useState<boolean>(false);
  const [addSupplier, setSuppliers] = useState<boolean>(false);
  const dispatch = useDispatch();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
/*     try{
      dispatch(postInventory(inventory))
      handleClose();
      swal("Guardado", "Su inventario se guardo correctamente", "success");
    }catch(err){
      swal("Error", "Hubo un error al guardar el nuevo inventario", "error");
    } */
  }

  function handleClose(): void {
    handleForm();
    setInventory(initialState);
  }

  function handleIputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInventory({ ...inventory, [event.target.name]: event.target.value });
  }

  function handleSelectChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    setInventory({ ...inventory, [event.target.name]: event.target.value });
  }

  function handleAddProduct(){
    setProducts(!addProducts);
  }

  function handleAddSuppliers(){
    setSuppliers(!addSupplier);
  }

  return (
    <div className={style.container}>
      { addProducts ? <AddProduct handleAddProduct={handleAddProduct}/> : null }
      { addSupplier ? <AddSupplier handleAddSuppliers={handleAddSuppliers}/> : null }
      <form className={style.form} onSubmit={handleSubmit}>
        <div>
          <button className="btn btn-" onClick={handleClose}>X</button>
        </div>
        <div className={style.inputs}>
          <h4>Agregar inventario</h4>
          <hr></hr>
          <h5>Productos</h5>
          <div className={style.barCodeData}>
            <div className="form-floating mb-3">
              <select
                id="type"
                className="form-select"
                value=""
                onChange={handleSelectChange}
              >
                <option value={BarCode.Coded128}>Coded128</option>
                <option value={BarCode.Code39}>Code39</option>
                <option value={BarCode.UPCA}>UPCA</option>
                <option value={BarCode.UPCE}>UPCE</option>
                <option value={BarCode.EAN8}>EAN8</option>
                <option value={BarCode.EAN13}>EAN13</option>
              </select>
              <label htmlFor="type">Tipo</label>
            </div>
            <div className="form-floating mb-3">
              <input
                id="barCode"
                className="form-control"
                value=""
                onChange={handleIputChange}
              />
              <label htmlFor="barCode">Codigo de barras</label>
            </div>
          </div>

          <button className="btn btn-success" onClick={handleAddProduct}>Agregar productos</button>
          <button className="btn btn-success" onClick={handleAddSuppliers}>Agregar proveedor</button>
          <button type="submit" className="btn btn-success">Agregar</button>
        </div>
      </form>
    </div>
  );
}
