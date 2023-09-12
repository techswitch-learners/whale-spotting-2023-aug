import { ReactNode, MouseEventHandler } from "react";
import "./Button.scss";

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler;
  type?: "button" | "submit" | "reset";
  role?: string;
}

const Button = ({ children, className, onClick, type, role }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`Button ${className ?? ""}`}
      onClick={onClick}
      role={role}
    >
      {children}
    </button>
  );
};

export default Button;
