import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import { constWebsocketActionsFeed } from '../constants/wsFeed/wsFeed';
import { constWebsocketActionsProfileOrders } from '../constants/wsProfileOrders/wsProfileOrders';
import { socketMiddleware } from '../middleware/socketMiddleware';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk,
  socketMiddleware("wss://norma.nomoreparties.space/orders/all",constWebsocketActionsFeed,false),
  socketMiddleware("wss://norma.nomoreparties.space/orders",constWebsocketActionsProfileOrders,true)));

export const store = createStore(rootReducer, enhancer);


/*const composeEnhancers = //не работает в .ts
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;;*/