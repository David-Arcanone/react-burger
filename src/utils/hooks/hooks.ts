import {
    TypedUseSelectorHook,
    useSelector,
    useDispatch
} from 'react-redux';
import { RootState, TAppDispatch} from '../../services/types';

export const useBurgerAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useBurgerAppDispatch: ()=>TAppDispatch = useDispatch;
//export const useBurgerAppDispatch: TAppDispatch = useDispatch;
