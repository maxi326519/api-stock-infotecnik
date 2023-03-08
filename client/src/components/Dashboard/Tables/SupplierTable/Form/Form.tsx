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
    id: "",
    code: 0,
    nombre: "",
    direccion: "",
    poblacion: "",
    postal: 0,
    cifNif: "",
    telefono: "",
  };

  const [supplier, setSupplier] = useState(initialState);
  const dispatch = useDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSupplier({ ...supplier, [event.target.name]: event.target.value });
  }

  function handleClose(): void {
    setSupplier(initialState);
    handleForm();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    try {
      dispatch(postSupplier(supplier));
      handleClose();
      swal("Guardado", "Su proveedor se guardo correctamente", "success");
    } catch (err) {
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
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            className=""
            value={supplier.nombre}
            onChange={handleChange}
          />

          <label htmlFor="direccion">Direccion</label>
          <input
            id="direccion"
            name="direccion"
            type="text"
            className=""
            value={supplier.direccion}
            onChange={handleChange}
          />

          <label htmlFor="postal">Codigo Postal</label>
          <input
            id="postal"
            name="postal"
            type="text"
            className=""
            value={supplier.postal}
            onChange={handleChange}
          />

          <label htmlFor="poblacion">Poblacion</label>
          <input
            id="poblacion"
            name="poblacion"
            type="text"
            className=""
            value={supplier.poblacion}
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

          <label htmlFor="telefono">Telefono</label>
          <input
            id="telefono"
            name="telefono"
            type="text"
            className=""
            value={supplier.telefono}
            onChange={handleChange}
          />
          <button type="submit">Agregar</button>
        </div>
      </form>
    </div>
  );
}
