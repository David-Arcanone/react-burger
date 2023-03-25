import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { checkUserAuth } from "../../services/actions/Login/Login";
import { useBurgerAppDispatch, useBurgerAppSelector } from "../../utils/hooks/hooks";
export const UnloggedPage:React.FC<{children: React.ReactNode}>=({ children })=> {
    const { isAuthChecked, isLogged } = useBurgerAppSelector(state => state.login);
    const location = useLocation();
    const previousLocation:string = location.state?.previous ?? '/'; 
    const dispatch = useBurgerAppDispatch();
    useEffect(() => { dispatch(checkUserAuth()); }, [ dispatch]);
    if (!isAuthChecked) {
        return null;
    }
    if (isLogged === true) {
        return <Navigate to={previousLocation} replace={true} />;
    }
    return <>{children}</>;
}
