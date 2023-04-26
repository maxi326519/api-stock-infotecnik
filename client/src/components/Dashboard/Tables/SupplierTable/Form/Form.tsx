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
import { validarNifCif } from "../../../../../functions/nifCif";

const initialState: Supplier = {
  id: "",
  numero: 0,
  nombre: "",
  direccion: "",
  poblacion: "",
  postal: 0,
  cifNif: "",
  telefono: "",
};

const initialError = {
  numero: "",
  nombre: "",
  direccion: "",
  poblacion: "",
  postal: "",
  cifNif: "",
  telefono: "",
};

interface Props {
  handleForm: () => void;
}

export default function Form({ handleForm }: Props) {
  const dispatch = useDispatch();
  const [supplier, setSupplier] = useState(initialState);
  const [error, setError] = useState(initialError);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSupplier({ ...supplier, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
    if (event.target.name === "cifNif") handleCifNif(event.target.value);
  }

  function handleClose(): void {
    setSupplier(initialState);
    handleForm();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (handleValidations()) {
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
  }

  function handleCifNif(value: string) {
    const response = validarNifCif(value);
    console.log(response);
    if (!response) setError({ ...error, cifNif: "Formato incorrecto" });
  }

  function handleValidations() {
    let newErrors = { ...error };
    let validation: boolean = true;

    if (supplier.numero === 0) {
      newErrors.numero = "Debes agregar un numero valido";
      validation = false;
    }
    if (supplier.nombre === "") {
      newErrors.nombre = "Debes agregar un nombre";
      validation = false;
    }
    if (supplier.direccion === "") {
      newErrors.direccion = "Debes agregar una direccion";
      validation = false;
    }
    if (supplier.poblacion <= "") {
      newErrors.poblacion = "Debes agregar la poblacion";
      validation = false;
    }
    if (supplier.postal === 0) {
      newErrors.postal = "Debes agregar la postal";
      validation = false;
    }
    if (supplier.cifNif === "") {
      newErrors.cifNif = "Debes completar este campo";
      validation = false;
    }
    if (supplier.telefono === "") {
      newErrors.telefono = "Debes agregar un telefono";
      validation = false;
    }
    setError(newErrors);
    return validation;
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Nuevo Proveedor</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={style.inputs}>
          <div className="form-floating">
            <input
              id={!error.numero ? "floatingInputInvalid" : "numero"}
              className={`form-control ${!error.numero ? "" : "is-invalid"}`}
              name="numero"
              type="text"
              value={supplier.numero}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="numero">
              Numero
            </label>
            <small>{error.numero}</small>
          </div>

          <div className="form-floating">
            <input
              id={!error.nombre ? "floatingInputInvalid" : "nombre"}
              className={`form-control ${!error.nombre ? "" : "is-invalid"}`}
              name="nombre"
              type="text"
              value={supplier.nombre}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="nombre">
              Nombre
            </label>
            <small>{error.nombre}</small>
          </div>

          <div className="form-floating">
            <input
              id={!error.direccion ? "floatingInputInvalid" : "direccion"}
              className={`form-control ${!error.direccion ? "" : "is-invalid"}`}
              name="direccion"
              type="text"
              value={supplier.direccion}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="direccion">
              Direccion
            </label>
            <small>{error.direccion}</small>
          </div>

          <div className="form-floating">
            <input
              id={!error.postal ? "floatingInputInvalid" : "modelo"}
              className={`form-control ${!error.postal ? "" : "is-invalid"}`}
              name="postal"
              type="text"
              value={supplier.postal}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="postal">
              Codigo Postal
            </label>
            <small>{error.postal}</small>
          </div>

          <div className="form-floating">
            <input
              id={!error.poblacion ? "floatingInputInvalid" : "poblacion"}
              className={`form-control ${!error.poblacion ? "" : "is-invalid"}`}
              name="poblacion"
              type="text"
              value={supplier.poblacion}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="poblacion">
              Poblacion
            </label>
            <small>{error.poblacion}</small>
          </div>

          <div className="form-floating">
            <input
              id={!error.cifNif ? "floatingInputInvalid" : "cifNif"}
              className={`form-control ${!error.cifNif ? "" : "is-invalid"}`}
              name="cifNif"
              type="text"
              value={supplier.cifNif}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="cifNif">
              CIF / NIF
            </label>
            <small>{error.cifNif}</small>
          </div>

          <div className="form-floating">
            <input
              id={!error.telefono ? "floatingInputInvalid" : "telefono"}
              className={`form-control ${!error.telefono ? "" : "is-invalid"}`}
              name="telefono"
              type="text"
              value={supplier.telefono}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="telefono">
              Telefono
            </label>
            <small>{error.telefono}</small>
          </div>

          <button className="btn btn-success" type="submit">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
