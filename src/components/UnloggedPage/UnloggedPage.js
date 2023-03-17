//import { useEffect } from "react";
//import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils/authentication/authentication";
export default function UnloggedPage({ children }) {
    if (!!getCookie("isLoggedIn") === true) {
        return <Navigate to="/" replace={true} />;
    }
    return <>{children}</>;
}
