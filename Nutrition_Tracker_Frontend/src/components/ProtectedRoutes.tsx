import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: JSX.Element;
}

export default function ProtectedRoute({children} : ProtectedRouteProps) {
    const token = localStorage.getItem("accessToken")
    if(!token) {
        alert("No Permission Please Login before")
        return <Navigate to="/login" replace/>;
    }
    return children
}

