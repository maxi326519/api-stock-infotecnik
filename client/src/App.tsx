import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

import LogIn from './components/LogIn/LogIn';
import Dashboad from './components/Dashboard/Dashboard';

import './App.css';

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