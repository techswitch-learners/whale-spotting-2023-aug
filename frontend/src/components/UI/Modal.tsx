import "./Modal.scss";
import { ReactNode } from "react";

interface ModalProps {
  children?: ReactNode;
  closeAction: () => void;
}

const Modal = ({ children, closeAction }: ModalProps) => {
  return (
    <div className="Modal__Backdrop">
      <div className="Modal">
        <button className="Modal__Close" onClick={closeAction}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
