import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../checkout/checkout.css'


const OrderHistory = () => {

  const navigate = useNavigate();
  const backtoshop = () => {
    navigate("/")
  }
  return (
    <div className='checkout-div'>
      <div className="sec-heading">
            My Order    
      </div>
      <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your order is set for delivery......</h3>
      
      <button className='--btn --btn-primary --btn-shop' onClick={backtoshop} > Back To Shop </button>
    </div>
  )
}

export default OrderHistory