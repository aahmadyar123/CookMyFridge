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
import LoginForm from "./pages/login_form";
import RegisterForm from "./pages/register_form";
import ReviewPage from "./pages/rating_form";
import {ProtectedRoute} from "./components/Utils/ProtectedRoute"
import {AuthProvider} from "./components/context/AuthProvider";
import { IngredientProvider } from "./components/context/ingredients_context";
import RecipeMenu from "./pages/recipes";
import ShowRecipe from "./pages/recipeShow";

function App() {
  return (
    <Router>
        <AuthProvider>
          <IngredientProvider>  
        <NavBar />
        
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/About" element={<About />} />
          {/* <Route path="/ContactUs" element={<ContactUs />} /> */}
          <Route path="/ContactUs" element={<ReviewPage />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Register" element={<RegisterForm />} />

          <Route
            path="/services/saved_recipes"
              element={
                <ProtectedRoute> 
                  <Services />
                  <SaveRecipe />
                </ProtectedRoute>
              } 
          />

          <Route
            path="/services/saved_recipes/:id"
            element={
                <ShowRecipe />
            }
          />  

          <Route
            path="/services/ingredients"
            element={
              <>
                <ProtectedRoute>
                  <Services />
                  <SaveIngredient />
                </ProtectedRoute>
              </>
            }
            />

          <Route
            path="/services/recipes"
            element={
              <ProtectedRoute> 
                  <Services />
                  <RecipeMenu />
                </ProtectedRoute>
              } 
          />

          <Route
            path="/services/recipes/:id"
            element={
                <ShowRecipe />
            }
          />  


        </Routes>
        </IngredientProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
