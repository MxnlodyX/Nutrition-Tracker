import { Routes, Route } from "react-router-dom";
import SignInPage from './pages/SignIn_Page'
import RegisterPage from './pages/Register_page'
import NutritionMainPage from "./pages/Nutrition_Main";
import ProtectedRoute from "./components/ProtectedRoutes";
import "./style/App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/nutritionTrack"
          element={
            <ProtectedRoute>
              <NutritionMainPage />
            </ProtectedRoute>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>


  );
}
