import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Login } from "../../interfaces";
import { login } from "../../redux/actions/login";
import { loading, closeLoading } from "../../redux/actions/loading/loading";
import { getAttributes, getProduct } from "../../redux/actions/products";
import { getSuppliers } from "../../redux/actions/suppliers";
/* import { getInvoice } from "../../redux/actions/invoices"; */
import { getInventory } from "../../redux/actions/inventory";
import { getClients } from "../../redux/actions/clients";
import { getTransactions } from "../../redux/actions/transactions";
import { getUsers } from "../../redux/actions/user";
import { getConfig } from "../../redux/actions/configurations";
import swal from "sweetalert";

import "./Login.css";
import logo from "../../assets/img/Infotecnik-logo.png";

interface Error {
  email: string | null;
  password: string | null;
}

const initialError: Error = {
  email: null,
  password: null,
};

export default function Signin() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(initialError);
  const [user, setUser] = useState<Login>({
    email: "maxi.326519@gmail.com",
    password: "12345678",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setUser({ ...user, [name]: value });
    handleValidations(name, value);
  }

  function handleValidations(name: string, value: string) {
    if (name === "email") {
      setError({ ...error, email: null });
    } else if (name === "password") {
      setError({ ...error, password: null });
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    let err: Error = {
      email: null,
      password: null,
    };

    if (user.email === "" || user.password === "") {
      if (user.email === "") err.email = "Debes ingresar un email";
      if (user.password === "") err.password = "Debes ingresar una contraseña";
      setError(err);
    } else {
      redirect("/dashboard");

      dispatch(loading());
      dispatch<any>(login(user))
        .then(() => {
          redirect("/dashboard");
          Promise.all([
            /* dispatch<any>(getInvoice()), */
            dispatch<any>(getProduct()),
            dispatch<any>(getAttributes()),
            dispatch<any>(getSuppliers()),
            dispatch<any>(getClients()),
            dispatch<any>(getInventory()),
            dispatch<any>(getTransactions()),
            dispatch<any>(getUsers()),
            dispatch<any>(getConfig()),
          ])
            .then(() => {
              dispatch(closeLoading());
            })
            .catch((err: any) => {
              swal(
                "Error",
                "Ocurrio un error al cargar los datos, intentelo mas tarde",
                "error"
              );
              dispatch(closeLoading());
              console.log(err);
            });
        })
        .catch((err: any) => {
          if (err.message.split(": ")[1] === "invalid credentials") {
            err.email = "Email o contraseña incorrecta";
            err.password = "Email o contraseña incorrecta";
            setError(err);
          } else {
            swal(
              "Error",
              "Ocurrió un error al iniciar sesión, intentelo mas tarde",
              "error"
            );
            console.log(err);
          }
          dispatch(closeLoading());
        });
    }
  }

  return (
    <div className="sesion">
      <form className="toLeft" onSubmit={handleSubmit}>
        <div className="header">
          <img src={logo} />
        </div>
        <div className="content">
          {/* EMAIL */}
          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              value={user.email}
              className={`form-control ${!error.email ? "" : "is-invalid"}`}
              id={error.email ? "floatingInputInvalid" : "user"}
              placeholder="name"
              onChange={handleChange}
              /*             required */
            />
            <label htmlFor="floatingInput">Email</label>
            {!error.email ? null : <small>{error.email}</small>}
          </div>

          {/* CONTRASEÑA */}
          <div className="form-floating mb-3">
            <input
              type="password"
              name="password"
              value={user.password}
              className={`form-control ${!error.password ? "" : "is-invalid"}`}
              id={error.password ? "floatingInputInvalid" : "pass"}
              placeholder="Contraseña"
              onChange={handleChange}
              /*             required */
            />
            <label htmlFor="floatingInput">Contraseña</label>
            {!error.password ? null : <small>{error.password}</small>}
          </div>

          <button className="submit" type="submit">
            Iniciar sesion
          </button>
        </div>
      </form>
    </div>
  );
}
