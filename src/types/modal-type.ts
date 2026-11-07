import { ReactNode } from "react";

export interface ModalProps {
  visible?: boolean;
  transparent?: boolean;
  animationType?: "none" | "fade" | "slide";
  children?: ReactNode;
}
