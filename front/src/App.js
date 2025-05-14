import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './components/Login';
import Signup from './components/Signup';
import Homepage from './components/Homepage';





function App() {  
  
   return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> {/* 회원가입 */}
          <Route path="/login" element={<Login />} /> {/* 로그인 */}
          <Route path="/Homepage" element={<Homepage />} /> {/* 메인 페이지 */}
          
        </Routes>
      </BrowserRouter>
    </div>
   
  );
  
}

export default App;