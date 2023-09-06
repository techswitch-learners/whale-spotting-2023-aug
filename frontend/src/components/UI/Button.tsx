import { ReactNode, MouseEventHandler } from "react";
import "./Button.scss";

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  submit?: boolean;
  onClick?: MouseEventHandler;
}

const Button = ({ children, className, submit, onClick }: ButtonProps) => {
  if (submit) {
    return (
      <button type="submit" className={`Button ${className ?? ""}`}>
        {children}
      </button>
    );
  }

  return (
    <button className={`Button ${className ?? ""}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
