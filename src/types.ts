import { ReactNode } from "react";

export interface FloatingButtonProps {
  children: ReactNode | undefined;
  widthContent: number;
  heightContent: number;
  borderRadiusContent?: number;
  maxLeft?: number;
  maxRight?: number;
  minHeight?: number;
  maxHeight?: number;
}

export interface FloatingButtonMethods {
  show: () => void;
  hide: () => void;
}