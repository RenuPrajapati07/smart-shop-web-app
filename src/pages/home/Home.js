import React from 'react'
import Slider from '../../components/slider/Slider'
import ProductSlider from '../products/product/ProductSlider';
import './Home.scss';

const Home = () => {
  return (
    <div>
      <Slider />
      <div className="main-content">
        <div className="layout">
          <div className="sec-heading">
            Mens Fashion
          </div>
          <ProductSlider type={'Mens Wear'}/> 
          <div className="sec-heading">
            Womens Fashion
          </div>
          <ProductSlider type={'Womens Wear'}/> 
          <div className="sec-heading">
            Shoes
          </div>
          <ProductSlider type={'Shoes'}/> 
        </div>
      </div>
    </div>
  )
}

export default Home