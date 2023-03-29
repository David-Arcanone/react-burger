import { constWebsocketActionsFeed } from "../../constants/wsFeed/wsFeed"
import { constWebsocketActionsProfileOrders } from "../../constants/wsProfileOrders/wsProfileOrders";

export type TMessage = {
    //succes: boolean;
    orders?: TOrderFromWS[];
    total?: number;
    totalToday?: number;
}
export type TOrderFromWS = {
    ingredients: string[];
    _id: string;
    status: TOrderStatus;
    number: number;
    name: string;
    createdAt: string;
    updatedAt: string
}
type TOrderStatus = "done" | "pending" | "created";

export type TWsState = {
    wsConnection: boolean;
    ordersList: TOrderFromWS[];
    error?: Event;
    total: number;
    totalToday: number;
    firstPack: boolean;
};
export type TWSActions = typeof constWebsocketActionsFeed | typeof constWebsocketActionsProfileOrders;

export type TArrayOfFillingIngredientsData = { 
    qty: number; 
    price: number; 
    name: string; 
    smallPic: string }