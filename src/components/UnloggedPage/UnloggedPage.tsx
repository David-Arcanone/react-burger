import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkUserAuth } from "../../services/actions/Login/Login";
import { useBurgerAppDispatch, useBurgerAppSelector } from "../../utils/hooks/hooks";
export const UnloggedPage:React.FC<{children: React.ReactNode}>=({ children })=> {
    const { isAuthChecked, isLogged } = useBurgerAppSelector(state => state.login);
    const dispatch = useBurgerAppDispatch();
    useEffect(() => { dispatch(checkUserAuth()); }, [checkUserAuth, dispatch]);
    if (!isAuthChecked) {
        return null;
    }
    if (isLogged === true) {
        return <Navigate to="/" replace={true} />;
    }
    return <>{children}</>;
}
