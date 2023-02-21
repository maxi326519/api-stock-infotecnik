import { Link } from "react-router-dom";

import styles from "./SideBar.module.css";

export default function SideBar({ changeTable }){
  return(
    <div className={ styles.sideBar }>
      <div className={ styles.user }>
        <img src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png" alt="user"/>
      </div>
      <button onClick={() => changeTable(1)}>Inventario</button>
      <button onClick={() => changeTable(2)}>Productos</button>
      <button onClick={() => changeTable(3)}>Proveedores</button>
      <button onClick={() => changeTable(4)}>Codigos de barra</button>
      <button onClick={() => changeTable(5)}>Facturas</button>
    </div>
  )
 }