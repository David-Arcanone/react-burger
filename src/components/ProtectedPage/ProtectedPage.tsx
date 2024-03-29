import { Navigate, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { checkUserAuth } from "../../services/actions/Login/Login";
import { useBurgerAppDispatch, useBurgerAppSelector } from "../../utils/hooks/hooks";
export const ProtectedPage:React.FC<{children: React.ReactNode}> =({ children })=> {
    const { isAuthChecked, isLogged } = useBurgerAppSelector(state => state.login);
    const dispatch = useBurgerAppDispatch();
    const location = useLocation();
    useEffect(()=>{dispatch(checkUserAuth())},[dispatch]);
    if (!isAuthChecked) {
        //return <p className="text text_type_main-large"></p>;//можно добавить текст загрузки
        return null;
    }
    if (isLogged === false) {
        return <Navigate to="/login" replace={true} state={{previous: location.pathname}}/>;
    }
    return <>{children}</>;
}
