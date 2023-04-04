import { Radio, RadioGroup } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { Button } from 'reactstrap'
import Cart from '../cart/Cart'
import './checkout.css'

const Checkout = () => {

    const navigate = useNavigate();

    const delivery = () => {
        toast.success("Order is placed")
        navigate("/myorder");
  }
   

  return (
    <div className='checkout-div'>
        <div className="sec-heading">
            Checkout Page    
        </div> 
        <h4>&nbsp;&nbsp;&nbsp;&nbsp;Payment mode: Offline</h4>
        <Button type="button" className='--btn --btn-primary --btn-shop' onClick={delivery}>Cash on Delivery</Button>
    </div>
  )
}

export default Checkout