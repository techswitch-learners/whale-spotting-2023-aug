import { ReactNode, MouseEventHandler } from "react";
import "./Button.scss";

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler;
  type?: "button" | "submit" | "reset";
}

const Button = ({ children, className, onClick, type }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`Button ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
