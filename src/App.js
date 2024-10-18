import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
  useEffect(() => {
    AOS.init({
      once: true,               
      disable: "phone",        
      duration: 1000,           
      easing: "ease",          
      offset: 400,              
      delay: 300              
    });
  
    AOS.refresh();
  }, []);

  return (
    // <BrowserRouter basename="/clients/zooz"> 
    //   <Routes>
    //     <Route path='/' element={<Home />} />
    //   </Routes>
    // </BrowserRouter>
    <BrowserRouter> 
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  </BrowserRouter>
  );
}
