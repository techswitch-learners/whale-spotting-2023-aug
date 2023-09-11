import { ReactNode } from "react";
import "./CarouselItem.scss";

interface CarouselElementProps {
  reference: React.RefObject<HTMLLIElement>;
  children?: ReactNode;
}

const CarouselItem = ({ reference, children }: CarouselElementProps) => {
  return (
    <li ref={reference} className="CarouselItem">
      {children}
    </li>
  );
};

export default CarouselItem;
