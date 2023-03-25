import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { sliderData } from './slider-data';
import './Slider.scss'

const Slider = () => {

  const navigate = useNavigate();

  const [ currentSlide, setCurrentSlide ] = useState(0)
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength -1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength -1  : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0)
  }, [])

  useEffect(() => {
    if(autoScroll) {
      function auto() {
        slideInterval = setInterval(nextSlide, intervalTime)
      };
      auto();
    }
    return () => clearInterval(slideInterval)
  }, [currentSlide, autoScroll, slideInterval]);

  const ProductPage = () => {
    navigate("/");
  }

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide}/>
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide}/>

      {sliderData.map((slide, index) => {

      const {image, heading,  desc} = slide

      return(
        <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
          {index === currentSlide && (
            <>
              <img src={image} alt="slide" />
              <div className="content">
                <h2>{heading}</h2>
                <p>{desc}</p>
                <hr />
                <button className='--btn --btn-primary' onClick={ProductPage}>
                  Shop Now
                </button>
              </div>
            </>
          )}
        </div>
      )
    })}
    </div>
  )
}

export default Slider