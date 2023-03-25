import React from 'react'
import {Container,Row,Col} from 'reactstrap';
import { AiOutlineDelete } from 'react-icons/ai'
import './Cart.css'

import { cartActions } from '../../redux/slice/cartSlice'
import { useSelector, useDispatch } from 'react-redux';

const Cart = () => {

  const cartItems = useSelector(state => state.cart.cartItems)

  return (
    
    <section>
      <div className="sec-heading">
        Shopping Cart    
      </div>
      <Container>
        <Row >
          <Col lg="9">
            {
              cartItems.length === 0 ? (<h2 className='text-bold'>No item in the cart</h2>
              ) : (
                <table className='divider'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Delete</th>
                  
                </tr>
              </thead>
              <tbody>
                {
                  cartItems.map((item) => (
                    <Tr item={item} />
                  ))
                }
              </tbody>
            </table>
              ) 
            }
            
          </Col>
          <Col lg="3"></Col>
        </Row>
      </Container>
    </section>
  )
}

const Tr = ({item}) => {

  const dispatch = useDispatch()
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id))
  }
  return (
    <tr >
      <td><img src={item.imgUrl} alt="img" /></td>
      <td>{item.productName}</td>
      <td>&#8377;{item.price}</td>
      <td>{item.quantity}px</td>
      <td className='delete-btn'><AiOutlineDelete onClick={deleteProduct}/></td>
    </tr>

  )
}

export default Cart