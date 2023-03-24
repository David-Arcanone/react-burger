/////////////OrderDetails
export interface IOrderDetailsState {
    orderRequest: boolean;
    orderRequestFailed: boolean;
    orderNumber: string;
    orderName: string;
    unResponded: boolean;
  }