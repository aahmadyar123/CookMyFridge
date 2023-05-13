import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar/Navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import ContactUs from "./pages/contact_us";
import SaveRecipe from "./pages/save_recipe";
import SaveIngredient from "./pages/save_ingredients";
import LoginForm from "./pages/LoginForm";
import ReviewPage from "./pages/rating_form";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route
          path="/SaveRecipe"
          element={
            <>
              <Services />
              <SaveRecipe />
            </>
          }
        />
        <Route
          path="/SaveIngredient"
          element={
            <>
              <Services />
              <SaveIngredient />
            </>
          }
        />
        <Route path="/rating_form" element={<ReviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
