import { useState } from "react";
import { useDispatch } from "react-redux";
import { Supplier } from ".././../../../../interfaces";
import { postSupplier } from "../../../../../redux/actions";
import swal from "sweetalert";

import style from "./Form.module.css";

interface Props {
  handleForm: () => void;
}

export default function Form({ handleForm }: Props) {
  const initialState: Supplier = {
    code: 0,
    name: "",
    address: "",
    poblation: "",
    cifNif: "",
    phone: "",
  };
  
  const [supplier, setSupplier] = useState(initialState);
  const dispatch = useDispatch()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSupplier({ ...supplier, [event.target.name]: event.target.value });
  }

  function handleClose(): void {
    setSupplier(initialState);
    handleForm();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    try{
      dispatch(postSupplier(supplier));
      handleClose();
      swal("Guardado", "Su proveedor se guardo correctamente", "success");
    }catch(err){
      swal("Error", "Hubo un error al guardar el nuevo proveedor", "error");
    }
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div>
          <button onClick={handleClose}>X</button>
        </div>
        <div className={style.inputs}>
          <h4>Agregar Proveedor</h4>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            className=""
            value={supplier.name}
            onChange={handleChange}
          />

          <label htmlFor="address">Direccion</label>
          <input
            id="address"
            name="address"
            type="text"
            className=""
            value={supplier.address}
            onChange={handleChange}
          />

          <label htmlFor="poblation">CP y Poblacion</label>
          <input
            id="poblation"
            name="poblation"
            type="text"
            className=""
            value={supplier.poblation}
            onChange={handleChange}
          />

          <label htmlFor="cifNif">CIF / NIF</label>
          <input
            id="cifNif"
            name="cifNif"
            type="text"
            className=""
            value={supplier.cifNif}
            onChange={handleChange}
          />

          <label htmlFor="phone">Telefono</label>
          <input
            id="phone"
            name="phone"
            type="text"
            className=""
            value={supplier.phone}
            onChange={handleChange}
          />
          <button type="submit">Agregar</button>
        </div>
      </form>
    </div>
  );
}
