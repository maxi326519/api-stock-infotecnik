import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import { RootState, User } from "../../../interfaces";

interface Props {
  handleClose: () => void;
}

export default function Profile({ handleClose }: Props) {
  const profile: User = useSelector((state: RootState) => state.profile);
  const [editUser, setEditUser] = useState<User>({
    id: "",
    rol: "",
    name: "",
    userName: "",
    email: "",
  });
  const [isDisabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    setEditUser(profile);
  }, [profile]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Guardado");
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEditUser({ ...editUser, [event.target.name]: event.target.value });
  }

  function handleEdit() {
    setDisabled(!isDisabled);
  }

  function handleCancel() {
    setDisabled(!isDisabled);
  }

  function handleChangePassword() {}

  return (
    <div className={styles.background}>
      <form className={`toTop ${styles.container}`} onSubmit={handleSubmit}>
        <div className={styles.close}>
          <h5>Perfil</h5>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={styles.inputs}>
          <div className="form-floating mb-3">
            <input
              id="name"
              name="name"
              value={editUser.name}
              className="form-control"
              onChange={handleChange}
              disabled={isDisabled}
            />
            <label htmlFor="name">Nombre:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              id="userName"
              name="userName"
              value={editUser.userName}
              className="form-control"
              onChange={handleChange}
              disabled={isDisabled}
            />
            <label htmlFor="userName">Usuario:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              id="email"
              name="email"
              value={editUser.email}
              className="form-control"
              onChange={handleChange}
              disabled={isDisabled}
            />
            <label htmlFor="email">Correo:</label>
          </div>
          {!isDisabled ? (
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleChangePassword}
            >
              Cambiar contraseña
            </button>
          ) : null}
        </div>
        {!isDisabled ? (
          <div className={styles.btnContainer}>
            <button className="btn btn-success" type="submit">
              Guardar
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            className="btn btn-success"
            type="button"
            onClick={handleEdit}
          >
            Editar
          </button>
        )}
      </form>
    </div>
  );
}
