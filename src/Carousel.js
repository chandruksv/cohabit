import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ images }) => {

  const [slidesNumber, setSlidesNumber] = useState(4);

  useEffect(()=> {

    if (window.innerWidth < 500) {
      setSlidesNumber(2);
    } 
    else if (window.innerWidth < 700){
      setSlidesNumber(3);
    } 
    else {
      setSlidesNumber(4);
    }
  },[]);

  useEffect(() => {
    const handleResize = () => {
    
      if (window.innerWidth < 500) {
        setSlidesNumber(2);
      } 
      else if (window.innerWidth < 700){
        setSlidesNumber(3);
      } 
      else {
        setSlidesNumber(4);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesNumber,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`examplePhoto ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
