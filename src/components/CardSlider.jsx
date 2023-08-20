import React, { memo, useRef, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const CardSlider = ({ data, title }) => {
  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPostion] = useState(0);
  const listRef = useRef();

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPostion(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPostion(sliderPosition + 1);
    }
  };

  return (
    <Container
      className="flex column"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        <div
          className={`slider-action left ${
            !showControls || data.length <= 5 ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>
        <div className="flex slider" ref={listRef}>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
        <div
          className={`slider-action right ${
            !showControls || data.length <= 5 ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </Container>
  );
};

export default memo(CardSlider);

const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    margin-left: 50px;
  }
  .wrapper {
    .slider {
      width: max-content;
      gap: 1rem;
      transform: transitionX(0px);
      transition: 0.3s ease-in-out;
      margin-left: 50px;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 30px;
      bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
        color: #b8b8b8;
        &:hover {
          color: white;
        }
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
      cursor: pointer;
    }
    .right {
      right: 0;
      cursor: pointer;
    }
  }

  @media (min-width: 320px) and (max-width: 767px) {
    padding: 1rem 0; /* Adjust the padding for smaller screens */
    h1 {
      margin-left: 1rem; /* Adjust the margin for smaller screens */
      font-size: 1.5rem; /* Adjust the font size for smaller screens */
    }
    .wrapper {
      .slider {
        margin-left: 1rem; /* Adjust the margin for smaller screens */
      }
      .slider-action {
        top: 10px; /* Adjust the top position for smaller screens */
        svg {
          font-size: 1.5rem; /* Adjust the icon size for smaller screens */
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1180px) {
    h1 {
      font-size: 2rem; /* Adjust the font size for medium screens */
    }
    .wrapper {
      .slider {
        margin-left: 2rem; /* Adjust the margin for medium screens */
      }
      .slider-action {
        top: 20px; /* Adjust the top position for medium screens */
        svg {
          font-size: 1.8rem; /* Adjust the icon size for medium screens */
        }
      }
    }
  }
`;
