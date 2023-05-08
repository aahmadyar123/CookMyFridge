import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import NavBar from "./components/Navbar/Navbar";
import Home from "./pages/home"
import About from "./pages/about"
import Services from "./pages/services"
import ContactUs from "./pages/contact_us"
function App() {
  return (
    <Router> 
      <NavBar />
      <Routes>
        <Route path='/Home' exact element={<Home/>} /> 
        <Route path='/About' element={<About/>} /> 
        <Route path='/Services' element={<Services/>} /> 
        <Route path='/ContactUs' element={<ContactUs/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
