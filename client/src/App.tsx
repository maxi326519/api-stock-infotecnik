import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import Login from "./components/Login/Login";
import Dashboad from "./components/Dashboard/Dashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Loading from "./components/Loading/Loading";
import { RootState } from "./interfaces";
import { useSelector } from "react-redux";

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  const redirect = useNavigate();
  const loading = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    redirect("/login");
  }, []);

  return (
    <div className="App">
      {loading ? <Loading /> : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboad />} />
      </Routes>
    </div>
  );
}

export default App;
