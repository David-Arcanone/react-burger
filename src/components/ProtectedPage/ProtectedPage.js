//import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils/authentication/authentication";
//import { useEffect } from "react";
export default function ProtectedPage({ children }) {
    if (!!getCookie("isLoggedIn")!==true) {
        return <Navigate to="/login" replace={true}/>;
    }
    return <>{children}</>;
}
