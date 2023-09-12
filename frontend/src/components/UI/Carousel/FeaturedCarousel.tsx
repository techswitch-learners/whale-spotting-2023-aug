import { ReactNode, useState } from "react";
import "./FeaturedCarousel.scss";

interface FeaturedCarouselProps {
  featuredItems: ReactNode[];
}

const FeaturedCarousel = ({ featuredItems }: FeaturedCarouselProps) => {
  const [lastSlide, setLastSlide] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0);

  const [moving, setMoving] = useState(false);

  return (
    <div className="FeaturedCarousel">
      <ul className="FeaturedCarousel__items">
        {featuredItems.map((item, i) => {
          return (
            <li
              className={`FeaturedCarousel__item ${
                activeSlide === i
                  ? "FeaturedCarousel__item--active"
                  : lastSlide === i
                  ? "FeaturedCarousel__item--out"
                  : ""
              }`}
            >
              {item}
            </li>
          );
        })}
      </ul>

      <ul className="FeaturedCarousel__buttons ">
        {featuredItems.map((_, i) => {
          return (
            <button
              className={`FeaturedCarousel__button ${
                activeSlide === i ? "FeaturedCarousel__button--active" : ""
              } `}
              disabled={moving}
              onClick={() => {
                setMoving(true);
                setTimeout(() => {
                  setMoving(false);
                }, 1800);
                setLastSlide(activeSlide);
                setActiveSlide(i);
              }}
            ></button>
          );
        })}
      </ul>
    </div>
  );
};

export default FeaturedCarousel;
