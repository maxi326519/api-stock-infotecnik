import { useState } from "react";
import { useDispatch } from "react-redux";
import { Supplier } from ".././../../../../interfaces";
import { postSupplier } from "../../../../../redux/actions/suppliers";
import swal from "sweetalert";

import style from "./Form.module.css";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";

interface Props {
  handleForm: () => void;
}

export default function Form({ handleForm }: Props) {
  const initialState: Supplier = {
    id: "",
    codigo: "",
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
    dispatch(loading());
    dispatch<any>(postSupplier(supplier))
      .then(() => {
        handleClose();
        dispatch(closeLoading());
        swal("Guardado", "Su proveedor se guardo correctamente", "success");
      })
      .catch((err: any) => {
        dispatch(closeLoading());
        swal("Error", "Hubo un error al guardar el nuevo proveedor", "error");
        console.log(err);
      });
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Agregar Proveedor</h4>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <div className={style.inputs}>
          <div className="form-floating">
            <input
              id="nombre"
              name="nombre"
              type="text"
              className="form-control"
              value={supplier.nombre}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="nombre">
              Nombre
            </label>
          </div>

          <div className="form-floating">
            <input
              id="direccion"
              name="direccion"
              type="text"
              className="form-control"
              value={supplier.direccion}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="direccion">
              Direccion
            </label>
          </div>

          <div className="form-floating">
            <input
              id="postal"
              name="postal"
              type="text"
              className="form-control"
              value={supplier.postal}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="postal">
              Codigo Postal
            </label>
          </div>

          <div className="form-floating">
            <input
              id="poblacion"
              name="poblacion"
              type="text"
              className="form-control"
              value={supplier.poblacion}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="poblacion">
              Poblacion
            </label>
          </div>

          <div className="form-floating">
            <input
              id="cifNif"
              name="cifNif"
              type="text"
              className="form-control"
              value={supplier.cifNif}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="cifNif">
              CIF / NIF
            </label>
          </div>

          <div className="form-floating">
            <input
              id="telefono"
              name="telefono"
              type="text"
              className="form-control"
              value={supplier.telefono}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="telefono">
              Telefono
            </label>
          </div>

          <button className="btn btn-success" type="submit">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
