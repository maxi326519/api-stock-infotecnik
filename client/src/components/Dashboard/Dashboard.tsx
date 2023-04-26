import { useState } from "react";

import SideBar from "./SideBar/SideBar";
import Tables from "./Tables/Tables";

import styles from "./Dashboard.module.css";
import Configuration from "./Configuration/Configuration";
import NavBar from "./NavBar/NavBar";
import Profile from "./Profile/Profile";

export default function Dashboad() {
  const [table, setTable] = useState(1);
  const [configuration, setConfiguration] = useState<boolean>(false);
  const [profile, setProfile] = useState<boolean>(false);

  function changeTable(number: number) {
    setTable(number);
  }

  function handleCloseConfiguration() {
    setConfiguration(!configuration);
  }

  function handleCloseProfile() {
    setProfile(!profile);
  }

  return (
    <div className={styles.dashboard}>
      {configuration ? (
        <Configuration handleClose={handleCloseConfiguration} />
      ) : null}
      {profile ? <Profile handleClose={handleCloseProfile} /> : null}
      <SideBar table={table} changeTable={changeTable} />
      <div className={styles.container}>
        <NavBar
          handleCloseProfile={handleCloseProfile}
          handleCloseConfiguration={handleCloseConfiguration}
        />
        <Tables table={table} />
      </div>
    </div>
  );
}
