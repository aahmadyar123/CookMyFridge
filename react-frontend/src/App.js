import React, { useEffect } from "react";
import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar/Navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import ContactUs from "./pages/contact_us";
import SaveRecipe from "./pages/save_recipe";
import SaveIngredient from "./pages/save_ingredients";
import LoginForm from "./pages/login_form";
import RegisterForm from "./pages/register_form";
import ReviewPage from "./pages/rating_form";
import {ProtectedRoute} from "./components/Utils/ProtectedRoute"
import { AuthProvider, useAuth } from "./components/context/AuthProvider";

function App() {
  return (
    
    <Router>
        <AuthProvider>
        <NavBar />
        
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/About" element={<About />} />

          <Route 
            path="/Services" 
              element={
                  <ProtectedRoute> 
                      <Services /> 
                  </ProtectedRoute>
              } 
          />

          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Register" element={<RegisterForm />} />

          <Route
            path="/services/recipes"
              element={
                <ProtectedRoute> 
                  <Services />
                  <SaveRecipe />
                </ProtectedRoute>
              } 
          />

          <Route
            path="/services/ingredients"
            element={
              <>
                <Services />
                <SaveIngredient />
              </>
            }
          />

          <Route path="/rating_form" element={<ReviewPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
