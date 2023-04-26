import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, Client } from "../../../../interfaces";

import ClientRows from "./ClientRows/ClientRows";
import Form from "./Form/Form";

import style from "./ClientsTable.module.css";
import add from "../../../../assets/svg/add.svg";

export default function ClientsTable() {
  const client = useSelector((state: RootState) => state.clients);
  const [rows, setRows] = useState<any>([]);
  const [form, setForm] = useState(false);

  useEffect(() => {
    setRows(client);
  }, [client]);

  function handleForm(): void {
    setForm(!form);
  }

  return (
    <div className={`toLeft ${style.dashboardList}`}>
      {form ? <Form handleForm={handleForm} /> : null}
      <h3>Clientes</h3>
      <div className={style.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar cliente"
        />
        <button className="btn btn-success" type="button" onClick={handleForm}>
          <img src={add} alt="add" />
          <span>Nuevo cliente</span>
        </button>
      </div>
      <div className={style.dashboardList__grid}>
        <div className={`${style.row} ${style.firstRow}`}>
          <span>Numero</span>
          <span>Nombre</span>
          <span>Direccion</span>
          <span>Telefono</span>
          <span>CP</span>
          <span>Poblacion</span>
          <span>CIF / NIF</span>
          <span>Editar</span>
          <span>Eliminar</span>
        </div>
        <div className={style.contentCard}>
          {rows.length <= 0 ? (
            <div className={style.listEmpty}>
              <span>No hay clientes</span>
            </div>
          ) : (
            rows?.map((client: Client) => (
              <ClientRows key={client.id} client={client} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
