import { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { postUser } from "../../../../../redux/actions/user";
import { PostUser, Rol } from "../../../../../interfaces";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";

import style from "./Form.module.css";

interface Props {
  handleForm: () => void;
}

export default function Form({ handleForm }: Props) {
  const initialState: PostUser = {
    rol: Rol.Admin,
    name: "",
    userName: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSelectChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    console.log(event.target.name, event.target.value);
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleClose(): void {
    setUser(initialState);
    handleForm();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(loading());
    dispatch<any>(postUser(user))
      .then(() => {
        handleClose();
        dispatch(closeLoading());
        swal("Guardado", "Su usuario se guardo correctamente", "success");
      })
      .catch((err: any) => {
        dispatch(closeLoading());
        swal("Error", "Hubo un error al guardar el nuevo usuario", "error");
        console.log(err);
      });
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Nuevo usuario</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={style.inputs}>
          <div className="form-floating">
            <select
              id="rol"
              name="rol"
              className="form-select"
              defaultValue={Rol.Admin}
              value={user.rol}
              onChange={handleSelectChange}
            >
              <option value={Rol.Admin}>{Rol.Admin}</option>
              <option value={Rol.Contador}>{Rol.Contador}</option>
            </select>
            <label className="form-label" htmlFor="rol">
              Rol
            </label>
          </div>

          <div className={style.inputs}>
            <div className="form-floating">
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                value={user.name}
                onChange={handleChange}
              />
              <label className="form-label" htmlFor="name">
                Nombre
              </label>
            </div>

            <div className="form-floating">
              <input
                id="userName"
                name="userName"
                type="text"
                className="form-control"
                value={user.userName}
                onChange={handleChange}
              />
              <label className="form-label" htmlFor="userName">
                Usuario
              </label>
            </div>

            <div className="form-floating">
              <input
                id="email"
                name="email"
                type="text"
                className="form-control"
                value={user.email}
                onChange={handleChange}
              />
              <label className="form-label" htmlFor="email">
                Correo
              </label>
            </div>

            <div className="form-floating">
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                value={user.password}
                onChange={handleChange}
              />
              <label className="form-label" htmlFor="password">
                Contraseña
              </label>
            </div>
          </div>
          <button className="btn btn-success" type="submit">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
