import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteClient, updateClient } from "../../../../../redux/actions/clients";
import { Client } from "../../../../../interfaces";
import swal from "sweetalert";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";

import edit from "../../../../../assets/svg/edit.svg";
import save from "../../../../../assets/svg/save.svg";
import cancel from "../../../../../assets/svg/cancel.svg";

import deleteSvg from "../../../../../assets/svg/delete.svg";

import style from "./ClientRows.module.css";

interface Props {
  client: Client;
}

export default function ClientRows({ client }: Props) {
  const dispatch = useDispatch();
  const [isDisabled, setDisabled] = useState(true);
  const [localClient, setLocalClient] = useState(client);

  function handleDisabled() {
    setDisabled(!isDisabled);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;

    setLocalClient({ ...localClient, [name]: value });
  }

  function handleUpdate() {
    swal({
      text: "¿Seguro que quiere actualizar el cliente?",
      buttons: {
        confirm: true,
        cancel: true,
      },
    }).then((res) => {
      if (res) {
        dispatch(loading());
        dispatch<any>(updateClient(localClient))
          .then(() => {
            swal("Actualizado", "Se actualizó el cliente con exito", "success");
            dispatch(closeLoading());
          })
          .catch((err: any) => {
            console.log(err);
            dispatch(closeLoading());
            swal(
              "Error",
              "Ocurrió un error al intentar actualizar el cliente",
              "error"
            );
          });
      }
    });
  }

  function handleRemove() {
    swal({
      text: "Seguro que quiere eliminar al cliente?",
      buttons: {
        confirm: true,
        cancel: true,
      },
    }).then((res) => {
      if (res) {
        dispatch(loading());
        dispatch<any>(deleteClient(client.id))
          .then(() => {
            swal("Eliminado", "Se eliminó el cliente con exito", "success");
            dispatch(closeLoading());
          })
          .catch((err: any) => {
            console.log(err);
            dispatch(closeLoading());
            swal(
              "Error",
              "Ocurrió un error al intentar eliminar el cliente",
              "error"
            );
          });
      }
    });
  }

  return (
    <div className={style.row}>
      <input
        name="numero"
        className="form-control"
        value={localClient.numero}
        placeholder="Numero"
        disabled={isDisabled}
        onChange={handleChange}
      />

      <input
        name="nombre"
        className="form-control"
        value={localClient.nombre}
        placeholder="Nombre"
        disabled={isDisabled}
        onChange={handleChange}
      />

      <input
        name="direccion"
        className="form-control"
        value={localClient.direccion}
        placeholder="Direccion"
        disabled={isDisabled}
        onChange={handleChange}
      />

      <input
        name="telefono"
        className="form-control"
        value={localClient.telefono}
        placeholder="Telefono"
        disabled={isDisabled}
        onChange={handleChange}
      />

      <input
        name="poblacion"
        className="form-control"
        value={localClient.poblacion}
        placeholder="Poblacion"
        disabled={isDisabled}
        onChange={handleChange}
      />

      <input
        name="postal"
        className="form-control"
        value={localClient.postal}
        placeholder="Postal"
        disabled={isDisabled}
        onChange={handleChange}
      />

      <input
        name="cifNif"
        className="form-control"
        value={localClient.cifNif}
        placeholder="CIF NIF"
        disabled={isDisabled}
        onChange={handleChange}
      />

      {isDisabled ? <button
        className="btn btn-primary"
        type="button"
        onClick={handleDisabled}
      >
        <img src={edit} alt="edit" />
      </button>
        :
        <div>
          <button
            className="btn btn-success"
            type="button"
            onClick={handleUpdate}
          >
            <img src={save} alt="edit" />
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleDisabled}
          >
            <img src={cancel} alt="edit" />
          </button>
        </div>
      }
      <button className="btn btn-danger" type="button" onClick={handleRemove}>
        <img src={deleteSvg} alt="delete" />
      </button>
    </div>
  );
}
