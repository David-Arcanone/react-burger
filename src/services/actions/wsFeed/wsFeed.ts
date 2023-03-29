import {
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_LIST,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_END
} from '../../constants/wsFeed/wsFeed';
import { TMessage } from '../../types/websocket/websocket';

export interface IWsFeedConnectionSuccess {
  type: typeof WS_FEED_CONNECTION_SUCCESS;
  payload: Event;
};
export interface IWsFeedConnectionError {
  type: typeof WS_FEED_CONNECTION_ERROR;
  payload: Event;
};
export interface IWsFeedConnectionClosed {
  type: typeof WS_FEED_CONNECTION_CLOSED;
};
export interface IWsFeedSGetList {
  type: typeof WS_FEED_GET_LIST;
  payload: TMessage
};
export interface IWsFeedSConnectionStart {
  type: typeof WS_FEED_CONNECTION_START;
};
export interface IWsFeedSConnectionEnd {
  type: typeof WS_FEED_CONNECTION_END;
};
export type TWsFeedActions = IWsFeedConnectionSuccess 
| IWsFeedConnectionError 
| IWsFeedConnectionClosed 
| IWsFeedSGetList 
| IWsFeedSConnectionStart
| IWsFeedSConnectionEnd;
export const wsFeedSConnectionStart = (): IWsFeedSConnectionStart => {
  return {
    type: WS_FEED_CONNECTION_START
  };
};
export const wsFeedSConnectionEnd = (): IWsFeedSConnectionEnd => {
  return {
    type: WS_FEED_CONNECTION_END
  };
};



