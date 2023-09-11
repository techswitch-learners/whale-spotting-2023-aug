import { useRef, ReactNode, useState, useEffect } from "react";
import "./FeaturedCarousel.scss";
import CarouselItem from "./CarouselItem";

interface FeaturedCarouselProps {
  featuredItems?: ReactNode[];
}

const FeaturedCarousel = ({ featuredItems }: FeaturedCarouselProps) => {
  const slider = useRef<HTMLUListElement>(null);

  const [sliderRefs, setSlideRefs] = useState<React.RefObject<HTMLLIElement>[]>(
    [],
  );

  const firstSlide = useRef<HTMLLIElement>(null);
  const secondSlide = useRef<HTMLLIElement>(null);
  const thirdSlide = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setSlideRefs([firstSlide, secondSlide, thirdSlide]);
  }, []);

  const scrollToSlide = (reference: React.RefObject<HTMLLIElement>) => {
    const leftOffset = reference.current?.offsetLeft;
    slider.current?.scrollTo({ left: leftOffset, behavior: "smooth" });
  };

  return (
    <div className="FeaturedCarousel">
      <ul ref={slider} className="FeaturedCarousel__items">
        {featuredItems &&
          featuredItems.map((item, i) => {
            return <CarouselItem reference={sliderRefs[i]} children={item} />;
          })}
      </ul>
      <div className="FeaturedCarousel__buttons">
        {featuredItems &&
          featuredItems.map((_, i) => {
            return (
              <button onClick={() => scrollToSlide(sliderRefs[i])}>-</button>
            );
          })}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
