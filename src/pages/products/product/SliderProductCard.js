import React from 'react'
import { Link } from 'react-router-dom'
import "./SliderProductCard.css"
import "./Product.scss"

const SliderProductCard = (product) => {
  return (
  <>
    <div className="product-card">  
    <div className="thumbnail">
        <img src={product.product.productimage} height={300} alt="product img"/>
    </div>
    <div className="prod-details">
      <span className="name">{product.product.producttitle}</span>
      <span className="price">&#8377;{product.product.price}</span>
      <Link to={`/product/${product.product.producttype}/${product.product.id}`}>
        <button className='show-more-btn'>
            Show more &gt;
        </button>
      </Link>
    </div>
    
  </div>
  </>
  )
}

export default SliderProductCard