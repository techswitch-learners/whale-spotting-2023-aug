import { useRef, ReactNode, useState, useEffect } from "react";
import CarouselItem from "./CarouselItem";
import "./FeaturedCarousel.scss";

interface FeaturedCarouselProps {
  featuredItems?: ReactNode[];
}

const FeaturedCarousel = ({ featuredItems }: FeaturedCarouselProps) => {
  const slider = useRef<HTMLUListElement>(null);

  const [activeSlide, setActiveSlide] = useState(0);

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

      <ul className="FeaturedCarousel__buttons">
        {featuredItems &&
          featuredItems.map((_, i) => {
            return (
              <li
                className={`FeaturedCarousel__button ${
                  activeSlide === i ? "FeaturedCarousel__button--active" : ""
                } `}
                onClick={() => {
                  setActiveSlide(i);
                  scrollToSlide(sliderRefs[i]);
                }}
              ></li>
            );
          })}
      </ul>
    </div>
  );
};

export default FeaturedCarousel;
