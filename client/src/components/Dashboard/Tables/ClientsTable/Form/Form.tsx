import { useState } from "react";
import { useDispatch } from "react-redux";
import { Client } from ".././../../../../interfaces";
import { postClient } from "../../../../../redux/actions/clients";
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
  const initialState: Client = {
    id: "",
    numero: 0,
    nombre: "",
    direccion: "",
    poblacion: "",
    postal: 0,
    cifNif: "",
    telefono: "",
  };

  const [client, setClient] = useState(initialState);
  const dispatch = useDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setClient({ ...client, [event.target.name]: event.target.value });
  }

  function handleClose(): void {
    setClient(initialState);
    handleForm();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(loading());
    dispatch<any>(postClient(client))
      .then(() => {
        handleClose();
        dispatch(closeLoading());
        swal("Guardado", "Se guardo el cliente correctamente", "success");
      })
      .catch((err: any) => {
        dispatch(closeLoading());
        swal("Error", "Hubo un error al guardar el nuevo ", "error");
        console.log(err);
      });
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Nuevo cliente</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={style.inputs}>
          <div className="form-floating">
            <input
              id="numero"
              name="numero"
              type="text"
              className="form-control"
              value={client.numero}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="numero">
              Numero
            </label>
            <small></small>
          </div>

          <div className="form-floating">
            <input
              id="nombre"
              name="nombre"
              type="text"
              className="form-control"
              value={client.nombre}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="nombre">
              Nombre
            </label>
            <small></small>
          </div>

          <div className="form-floating">
            <input
              id="direccion"
              name="direccion"
              type="text"
              className="form-control"
              value={client.direccion}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="direccion">
              Direccion
            </label>
            <small></small>
          </div>

          <div className="form-floating">
            <input
              id="postal"
              name="postal"
              type="text"
              className="form-control"
              value={client.postal}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="postal">
              Codigo Postal
            </label>
            <small></small>
          </div>

          <div className="form-floating">
            <input
              id="poblacion"
              name="poblacion"
              type="text"
              className="form-control"
              value={client.poblacion}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="poblacion">
              Poblacion
            </label>
            <small></small>
          </div>

          <div className="form-floating">
            <input
              id="cifNif"
              name="cifNif"
              type="text"
              className="form-control"
              value={client.cifNif}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="cifNif">
              CIF / NIF
            </label>
            <small></small>
          </div>

          <div className="form-floating">
            <input
              id="telefono"
              name="telefono"
              type="text"
              className="form-control"
              value={client.telefono}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="telefono">
              Telefono
            </label>
            <small></small>
          </div>

          <button className="btn btn-success" type="submit">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
