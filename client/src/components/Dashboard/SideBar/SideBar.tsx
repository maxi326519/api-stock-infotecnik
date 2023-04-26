import users from "../../../assets/svg/sideBar/users.svg";
import inventory from "../../../assets/svg/sideBar/inventory.svg";
import product from "../../../assets/svg/sideBar/product.svg";
import supplier from "../../../assets/svg/sideBar/supplier.svg";
import clients from "../../../assets/svg/sideBar/clients.svg";
import invoice from "../../../assets/svg/sideBar/invoice.svg";
import bank from "../../../assets/svg/sideBar/bank.svg";
import logo from "../../../assets/img/Infotecnik-logo.png"

import styles from "./SideBar.module.css";

const items = [
  { name: "Usuarios", icon: users },
  { name: "Inventario", icon: inventory },
  { name: "Productos", icon: product },
  { name: "Proveedores", icon: supplier },
  { name: "Clientes", icon: clients },
  { name: "Facturas", icon: invoice },
  { name: "Movimientos", icon: bank },
];

interface Props {
  table: number;
  changeTable: (number: number) => void;
}

export default function SideBar({ table, changeTable }: Props) {
  return (
    <div className={styles.sideBar}>
      <div className={styles.head}>
        <img src={logo} alt="logo"/>
      </div>
      {items.map((item, i) => (
        <button
          className={table === i ? styles.selected : ""}
          type="button"
          onClick={() => changeTable(i)}
        >
          <img src={item.icon} alt="users" />
          {item.name}
        </button>
      ))}
    </div>
  );
}
