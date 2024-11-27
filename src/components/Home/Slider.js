import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";

import reactlogo from '../../Pictures/react-logo.webp';
import css from '../../Pictures/css logo.png';
import JavaScript from '../../Pictures/logo.png';
import Html from '../../Pictures/html.webp';
import contact from '../../Pictures/contact.png';

const SliderComponent = () => {
  const images = [
    reactlogo,css,JavaScript,Html,contact
  ];

  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite looping
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Number of slides visible at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Time between slides in ms
    rtl: true, // **Enable right-to-left transition**
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Slide ${index + 1}`} className="slider-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
