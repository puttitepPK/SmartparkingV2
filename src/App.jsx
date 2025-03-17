// src/App.js
import React, { useState,useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate,useNavigate } from 'react-router-dom';
import Login from './page/Login/Login';
import Signup from './page/Login/Singup/Singup';
import Forgot from './page/Login/Forgot/Forgot';
import Resetpass from './page/Login/Forgot/Resetpass';

import Home from './page/Home/Home';
import ScanQR from './page/Home/ScanQR/ScanQR';

import Findparking from './page/Findparking/Findparking';
import Record from './page/Record/Record';

import Profile from './page/Profile/Profile';
import EditMember from "./page/Profile/editmember/editmember";
import Payment from './page/Profile/Payment/Payment';
import Appointment from './page/Profile/appointment/appointment'
import Report from './page/Profile/Report/report';
import True from './page/Profile/Payment/True/True';
import Promptpay from './page/Profile/Payment/Promptpay/Promptpay';
import Finishedp1 from './page/Profile/Payment/Promptpay/Finishedp1/Finishedp1';
import Finishedt2 from './page/Profile/Payment/True/Finishedt2/Finishedt2';
import Unsuccessful1 from './page/Profile/Payment/Promptpay/Unsuccessful1/Unsuccessful1';


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import './App.css'
function App() {
  // กำหนดค่าเริ่มต้นโดยตรวจสอบจาก localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("loggedIn") === "true");

  const handleLogin = (username, role) => {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userRole", role); // เก็บ role ของผู้ใช้งาน
    setIsAuthenticated(true);
  };
  

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setIsAuthenticated(false);
  };
  // <button onClick={onLogout}>ออกจากระบบ</button>  ไว้ใช้ Logout

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/home" 
          element={isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route path="/home/ScanQRCode" element={<ScanQR />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/forgot-password/resetpass" element={<Resetpass />} />
        <Route path="/" element={<Home />} />
        <Route path="/findparking" element={<Findparking />} />
        <Route path="/record" element={<Record />} />
        
        <Route path="/profile" element={isAuthenticated ? <Profile onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/profile/edit-member" element={<EditMember />} />
        <Route path="/profile/payment" element={<Payment />} />
        <Route path="/profile/payment/promptpay" element={<Promptpay />} />
        <Route path="/profile/appointment" element={<Appointment />} />
        <Route path="/profile/report" element={<Report />} />
        <Route path="/profile/payment/true" element={<True />} />
        <Route path="/profile/payment/promptpay/finished" element={<Finishedp1 />} />
        <Route path="/profile/payment/true/finished" element={<Finishedt2/>} />
        <Route path="/profile/payment/promptpay/unsuccessful" element={<Unsuccessful1 />} />
        <Route path="/profile/payment/true/unsuccessful" element={<Unsuccessful1 />} />
        
      </Routes>
   
    </Router>
  );
}

export default App;

// Test2
