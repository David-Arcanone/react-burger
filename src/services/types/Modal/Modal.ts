/////////////Modal
import React from "react";
export interface IModalState {
  modalData: string;
}
export type TModalProps= {
  onClose: ()=>void;
  children: React.ReactNode;
}