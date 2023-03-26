import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { db } from '../../firebase/config';
import { cartActions } from '../../redux/slice/cartSlice';
import './CartCard.css'

const CartCard = (props) => {

  //const cartItems = useSelector((state) => state.cart.cartItems)
  //const totalAmount = useSelector((state) => state.cart.totalAmount)
    const [prodquantity, setProdQuantity] = useState(props.itemdata.quantity);
    
    let p = (props.itemdata.product.price)*prodquantity
    
    const increasequantity = async () => {
        setProdQuantity(prodquantity + 1)

        const itemref = doc(db, `cart-${props.userid}`, `${props.itemdata.id}`)
        await updateDoc(itemref,{
            quantity: prodquantity + 1
        }).then(() => {console.log('change quantity')})
    }
    const decreasequantity = async () => {
        if(prodquantity >= 1) {
            setProdQuantity(prodquantity - 1)
            
        const itemref = doc(db, `cart-${props.userid}`, `${props.itemdata.id}`)
        await updateDoc(itemref,{
            quantity: prodquantity - 1
        }).then(() => {console.log('change quantity')})
        }
    } 
    
    const deletecartitem = async() => {
        await deleteDoc(doc(db, `cart-${props.userid}`, `${props.itemdata.id}`))
        .then(() => {
            console.log('doc deleted')
        })
    }

  return (
    <div className='cart-prod-container'>
        <div className='cart-prod-imgtitle'>
            <div className='prod-image'>
                <img src={props.itemdata.product.productimage} /> 
            </div>
            <div className='prod-title'>
                {props.itemdata.product.producttitle}
            </div>
        </div>
        <div className='prod-quantity-div'>
            <button onClick={increasequantity}>+</button>
            <p>{prodquantity}</p>
            <button onClick={decreasequantity}>-</button>
        </div>
        <div className='prod-price'>&#8377;{p}</div><div />
    
        <div className='delete-btn' onClick={deletecartitem}><AiOutlineDelete /></div>
    </div>
  )}

export default CartCard