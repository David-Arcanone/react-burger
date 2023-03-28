import React from "react";
export type TCustomScrollbarProps = {
    customHeight: number;
    customOffsetBottom: number;
    children: React.ReactNode;
    sizeType: "big" | "normal" | "small";
}