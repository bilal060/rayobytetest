import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomSlide = ({
  children,
  slideWrapperStyle,
}: {
  children: React.ReactElement<{ isCentered: Boolean }>;
  slideWrapperStyle: any;
  isCentered: boolean;
  index: any;
}) => {
  const style = { ...slideWrapperStyle };
  return (
    <div style={style}>
      {React.isValidElement(children)
        ? React.cloneElement(children )
        : null}
    </div>
  );
};

const Carousel = ({
  className,
  children,
  dotSlot,
  sliderWrapperStyle,
  dotSlotWrapperStyle,
  slideWrapperStyle,
  arrows,
  nextArrow,
  prevArrow,
  onCurrentSlideChange,
  slidesToShow,
  ...props
}: {
  className: string;
  children: [];
  dotSlot: React.ReactElement<{ onClick: () => void }>;
  sliderWrapperStyle: React.CSSProperties;
  dotSlotWrapperStyle: React.CSSProperties;
  slideWrapperStyle: React.CSSProperties;
  arrows: boolean;
  nextArrow: React.ReactElement<{ onClick: () => void }>;
  prevArrow: React.ReactElement<{ onClick: () => void }>;
  onCurrentSlideChange?: (currentSlide: number) => void;
  slidesToShow: number;
}) => {
  const sliderRef = useRef<any>();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const settings = {
    ...props,
    arrows: false,
    // centerMode: true,
    className: "center",

    appendDots: (dots: any[]) => {
      return (
        <div style={dotSlotWrapperStyle}>
          <ul>
            {dots.map((dot, index) => {
              return (
                <li key={index} style={{ display: "inline-block" }}>
                  {React.isValidElement(dotSlot)
                    ? React.cloneElement(dotSlot, {
                        onClick: () => {
                          if (!sliderRef.current) return;
                          sliderRef.current.slickGoTo(index);
                        },
                      })
                    : null}
                </li>
              );
            })}
          </ul>
        </div>
      );
    },

    afterChange: (current: React.SetStateAction<number>) =>
      setCurrentSlide(current),
  };

  React.useEffect(() => {
    onCurrentSlideChange && onCurrentSlideChange(currentSlide);
  }, [currentSlide, onCurrentSlideChange]);

  const onPrev = () => {
    if (!sliderRef.current) return;
    sliderRef.current.slickPrev();
  };

  const onNext = () => {
    if (!sliderRef.current) return;
    sliderRef.current.slickNext();
  };

  const centerSlideIndex =
    (Math.floor(slidesToShow / 2) + currentSlide) %
    React.Children.count(children);

  return (
    <div style={sliderWrapperStyle}>
      {arrows && React.isValidElement(prevArrow)
        ? React.cloneElement(prevArrow, { onClick: onPrev })
        : null}
      <div
        style={{
          maxWidth: "100%",
        }}
      >
        <Slider {...settings} ref={sliderRef}>
          {React.Children.map(children, (child: any, index) => {
            return (
              <CustomSlide
                index={index}
                isCentered={index === centerSlideIndex}
                slideWrapperStyle={slideWrapperStyle}
              >
                {child}
              </CustomSlide>
            );
          })}
        </Slider>
      </div>

      {arrows && React.isValidElement(nextArrow)
        ? React.cloneElement(nextArrow, { onClick: onNext })
        : null}
    </div>
  );
};

export default Carousel;
