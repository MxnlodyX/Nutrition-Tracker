import { Routes, Route } from "react-router-dom";
//import LoginPage from './pages/Login_Page'
import RegisterPage from './pages/Register_page'
import NutritionMainPage from "./pages/Nutrition_Main";
import "./style/App.css";


export default function App() {
  return (
    <Routes>
            {/* 
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes> 
      */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/nutritionTrack" element={<NutritionMainPage />} />
    </Routes>


  );
}
