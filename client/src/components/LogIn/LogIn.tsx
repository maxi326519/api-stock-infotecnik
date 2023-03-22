import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Login } from "../../interfaces";
import { login } from "../../redux/actions/login/login";
import { loading, closeLoading } from "../../redux/actions/loading/loading";

import "./Login.css";
import { getProduct } from "../../redux/actions/products";
import { getSuppliers } from "../../redux/actions/suppliers";
import { getInvoice } from "../../redux/actions/invoices";
import { getInventory } from "../../redux/actions/inventory";
import swal from "sweetalert";

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
      dispatch(loading());
      dispatch<any>(login(user))
        .then(() => {
          redirect("/dashboard");
          Promise.all([
            dispatch<any>(getProduct()),
            dispatch<any>(getSuppliers()),
            dispatch<any>(getInvoice()),
            dispatch<any>(getInventory()),
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
      <form onSubmit={handleSubmit}>
        <h2>Iniciar sesion</h2>
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

        <button className="btn btn-primary" type="submit">
          Iniciar sesion
        </button>
      </form>
    </div>
  );
}
