import { useState } from "react";

import SideBar from "./SideBar/SideBar";
import Tables from "./Tables/Tables";

import styles from "./Dashboard.module.css";

export default function Dashboad() {
  const [table, setTable] = useState(0);

  function changeTable(number: number){
    setTable(number);
  }

  return (
    <div className={styles.dashboard}>
      <SideBar changeTable={changeTable}/>
      <Tables table={table} />
    </div>
  );
}
