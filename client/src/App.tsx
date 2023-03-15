import { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import Login from './components/Login/Login';
import Dashboad from './components/Dashboard/Dashboard';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  const redirect = useNavigate();

  useEffect(()=>{
    redirect("/login");
  },[]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboad/>}/>
      </Routes>
    </div>
  );
}

export default App;