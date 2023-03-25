export type THeaderButtonProps = {
    message:string;
    clickCallBack: ()=>void;
    statusActive: boolean;
    addClass?: string;
    children:React.ReactNode;
  }