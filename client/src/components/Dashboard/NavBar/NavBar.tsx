import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../redux/actions/login";

import user from "../../../assets/svg/user.svg";
import profile from "../../../assets/svg/user.svg";
import config from "../../../assets/svg/menu/config.svg";
import logout from "../../../assets/svg/menu/logout.svg";

import styles from "./NavBar.module.css";

interface Props {
  handleCloseProfile: () => void;
  handleCloseConfiguration: () => void;
}

export default function NavBar({
  handleCloseProfile,
  handleCloseConfiguration,
}: Props) {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const [menu, setMenu] = useState<boolean>(false);

  function handleMenuActive() {
    setMenu(!menu);
  }

  function handleProfile() {
    setMenu(!menu);
    handleCloseProfile();
  }

  function handleConfiguration() {
    setMenu(!menu);
    handleCloseConfiguration();
  }

  function handleLogOut() {
    dispatch(logOut())
    redirect("/login");
  }

  return (
    <div className={`toLeft ${styles.navBar}`}>
      <div className={styles.imgContainer} onClick={handleMenuActive}>
        <img src={user} alt="user" />
      </div>
      <div
        className={`${styles.backMenu} ${menu ? styles.backActive : null}`}
        onClick={handleMenuActive}
      >
        <ul className={styles.menu}>
          <li onClick={handleProfile}>
            <img src={profile} alt="profile" />
            Perfil
          </li>
          <li onClick={handleConfiguration}>
            <img src={config} alt="config" />
            Configuracion
          </li>
          <li onClick={handleLogOut}>
            <img src={logout} alt="logout" />
            Salir
          </li>
        </ul>
      </div>
    </div>
  );
}
