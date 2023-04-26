import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, User } from "../../../../interfaces";

import UserRows from "./UserRows/UserRows";
import Form from "./Form/Form";

import style from "./UsersTable.module.css";
import add from "../../../../assets/svg/add.svg";

export default function UsersTable() {
  const users: User[] = useSelector((state: RootState) => state.users);
  const [rows, setRows] = useState<any>([]);
  const [form, setForm] = useState(false);

  useEffect(() => {
    setRows(users);
  }, [users]);

  function handleForm(): void {
    setForm(!form);
  }

  return (
    <div className={`toLeft ${style.dashboardList}`}>
      {form ? <Form handleForm={handleForm} /> : null}
      <h3>Usuarios</h3>
      <div className={style.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar usuario"
        />
        <button className="btn btn-success" type="button" onClick={handleForm}>
          <img src={add} alt="add" />
          <span>Nuevo usuario</span>
        </button>
      </div>
      <div className={style.dashboardList__grid}>
        <div className={`${style.row} ${style.firstRow}`}>
          <span>Rol</span>
          <span>Usuario</span>
          <span>Nombre</span>
          <span>Correo</span>
          <span>Clave</span>
          <span>Editar</span>
          <span>Eliminar</span>
        </div>
        <div className={style.contentCard}>
          {rows.length <= 0 ? (
            <div className={style.listEmpty}>
              <span>No hay usuarios</span>
            </div>
          ) : (
            rows?.map((user: User) => <UserRows key={user.id} user={user} />)
          )}
        </div>
      </div>
    </div>
  );
}
