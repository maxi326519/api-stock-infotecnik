import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, updateUser } from "../../../../../redux/actions/user";
import { Rol, User } from "../../../../../interfaces";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";
import swal from "sweetalert";

import edit from "../../../../../assets/svg/edit.svg";
import save from "../../../../../assets/svg/save.svg";
import cancel from "../../../../../assets/svg/cancel.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";

import style from "./UserRows.module.css";

interface Props {
  user: User;
}

export default function SupplieRows({ user }: Props) {
  const dispatch = useDispatch();
  const [isDisabled, setDisabled] = useState(true);
  const [editUser, setEditUser] = useState<User>(user);

  function handleDisabled() {
    setDisabled(!isDisabled);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEditUser({ ...editUser, [event.target.name]: event.target.value });
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setEditUser({ ...editUser, [event.target.name]: event.target.value });
  }

  function handleUpdatePassword() {}

  function handleUpdate() {
    swal({
      text: "¿Seguro que quiere actualizar el proveedor?",
      buttons: {
        confirm: true,
        cancel: true,
      },
    }).then((res) => {
      if (res) {
        dispatch(loading());
        dispatch<any>(updateUser(editUser))
          .then(() => {
            swal(
              "Actualizado",
              "Se actualizó el proveedor con exito",
              "success"
            );
            dispatch(closeLoading());
          })
          .catch((err: any) => {
            console.log(err);
            dispatch(closeLoading());
            swal(
              "Error",
              "Ocurrió un error al intentar actualizar el proveedor",
              "error"
            );
          });
      }
    });
  }

  function handleRemove() {
    swal({
      text: "Seguro que quiere eliminar el proveedor?",
      buttons: {
        confirm: true,
        cancel: true,
      },
    }).then((res) => {
      if (res) {
        dispatch(loading());
        dispatch<any>(deleteUser(user.id))
          .then(() => {
            swal("Eliminado", "Se eliminó el proveedor con exito", "success");
            dispatch(closeLoading());
          })
          .catch((err: any) => {
            console.log(err);
            dispatch(closeLoading());
            swal(
              "Error",
              "Ocurrió un error al intentar eliminar el proveedor",
              "error"
            );
          });
      }
    });
  }

  return (
    <div className={style.row}>
      <label className={style.rolLabel} htmlFor="rol">
        .
      </label>
      <select
        id="rol"
        name="rol"
        className="form-select"
        value={editUser.rol}
        disabled={isDisabled}
        onChange={handleSelectChange}
      >
        <option value={Rol.Admin}>{Rol.Admin}</option>
        <option value={Rol.Contador}>{Rol.Contador}</option>
      </select>
      <input
        name="userName"
        className="form-control"
        value={editUser.userName}
        placeholder="Nombre"
        disabled={isDisabled}
        onChange={handleChange}
      />
      <input
        name="name"
        className="form-control"
        value={editUser.name}
        placeholder="Direccion"
        disabled={isDisabled}
        onChange={handleChange}
      />
      <input
        name="email"
        className="form-control"
        value={editUser.email}
        placeholder="Telefono"
        disabled={isDisabled}
        onChange={handleChange}
      />
      <button
        className="btn btn-primary"
        type="button"
        onClick={handleUpdatePassword}
      >
        Cambiar
      </button>
      {isDisabled ? (
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleDisabled}
        >
          <img src={edit} alt="edit" />
        </button>
      ) : (
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
      )}
      <button className="btn btn-danger" type="button" onClick={handleRemove}>
        <img src={deleteSvg} alt="delete" />
      </button>
    </div>
  );
}
