//type rrr = typeof WebSocket | null;
import type { Middleware, MiddlewareAPI } from 'redux';
import { getCookie } from '../../utils/authentication/authentication';
import { AppDispatch, RootState,TApplicationActions } from '../types';
import {TWSActions} from "../types/websocket/websocket"


export const socketMiddleware = (wsUrl:string, wsActions:TWSActions, isProtected: boolean):Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {//AppThunk тут не нужен в AppDispatch
      let socket: WebSocket | null = null;
  
      return next =>(action:TApplicationActions)  => {
        const { dispatch, getState } = store;
        const {isLogged}= getState().login;
        const type= action.type;
        const { wsInit,wsEnd, onOpen, onClose, onError, onNewList } = wsActions;
        if (type === wsInit && (!isProtected || (isLogged))) {
          const additionalURLQuery = isProtected?`?token=${getCookie("accessTokenBurger")?.slice(7)}`:"";
          socket = new WebSocket(`${wsUrl}${additionalURLQuery}`);
        }
        if (socket ) {//Запущен Websocket
          socket.onopen = event => {
            
            console.log("opened");

            console.log(event);
            dispatch({ type: onOpen, payload: event });
          };
          socket.onerror = event => {
            
            dispatch({ type: onError, payload: event });
          };
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
            dispatch({ type: onNewList, payload: restParsedData });
          };
  
          socket.onclose = event => {
            console.log("closed");
            dispatch({ type: onClose});
          };
          if (type === wsEnd) {  
            socket.close();
          }
        }
  
        next(action);
      };
    };
  };