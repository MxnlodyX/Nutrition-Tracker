import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/Login_Page'
import RegisterPage from './pages/Register_page'

import "./style/App.css";
 

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>


  );
}
