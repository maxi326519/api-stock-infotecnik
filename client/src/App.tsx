import { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import LogIn from './components/LogIn/LogIn';
import Dashboad from './components/Dashboard/Dashboard';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

axios.defaults.baseURL = "http://localhost:3000/";

function App() {
  const redirect = useNavigate();

  useEffect(()=>{
    redirect("/dashboard");
  },[]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/dashboard" element={<Dashboad/>}/>
      </Routes>
    </div>
  );
}

export default App;