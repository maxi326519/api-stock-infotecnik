import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { RootState } from "./interfaces";
import { useDispatch, useSelector } from "react-redux";
import { getAttributes, getProduct } from "./redux/actions/products";
import { getSuppliers } from "./redux/actions/suppliers";
import { getInvoice } from "./redux/actions/invoices";
import { getInventory } from "./redux/actions/inventory";
import { closeLoading, loading } from "./redux/actions/loading/loading";
import { getTransactions } from "./redux/actions/transactions";
import { getConfig } from "./redux/actions/configurations";
import { getClients } from "./redux/actions/clients";
import { getUsers } from "./redux/actions/user";
import { persistence } from "./redux/actions/login";
import swal from "sweetalert";

import Loading from "./components/Loading/Loading";
import Login from "./components/Login/Login";
import Dashboad from "./components/Dashboard/Dashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./Animation.css";

function App() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const load = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    const data = localStorage.getItem("user");
    let userData = null;

    if (data) userData = JSON.parse(data);

    if (userData) {
      dispatch(loading());
      dispatch<any>(getInvoice);
      dispatch<any>(persistence(userData))
        .then(() => {
          Promise.all([
            dispatch<any>(getProduct()),
            dispatch<any>(getAttributes()),
            dispatch<any>(getSuppliers()),
            dispatch<any>(getClients()),
            dispatch<any>(getInventory()),
            dispatch<any>(getInvoice()),
            dispatch<any>(getTransactions()),
            dispatch<any>(getUsers()),
            dispatch<any>(getConfig()),
          ])
            .then(() => {
              redirect("/dashboard");
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
          console.log(err);
          redirect("/login");
        });
    } else {
      redirect("/login");
    }
  }, [dispatch, redirect]);

  return (
    <div className="App">
      {load ? <Loading /> : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboad />} />
      </Routes>
    </div>
  );
}

export default App;
