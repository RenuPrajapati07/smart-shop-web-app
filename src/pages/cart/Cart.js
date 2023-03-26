import React, { useEffect, useState } from 'react'
import {Container,Row,Col} from 'reactstrap';
import { AiOutlineDelete } from 'react-icons/ai'
import './Cart.css'

import { cartActions } from '../../redux/slice/cartSlice'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import CartCard from './CartCard';
import { onAuthStateChanged } from 'firebase/auth';

const Cart = () => {

  function GetCurrentUser() {
    const [user, setUser] = useState('')
    const usersCollectionRef = collection(db, "users")

    useEffect(() => {
      onAuthStateChanged(auth, (userlogged) => {
        if(userlogged) {
          const getUsers = async () => {
            const q = query(collection(db,"users"), where("uid","==",userlogged.uid))
            console.log(q)
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({...doc.data(),id:doc.id})));
          };
          getUsers();
        }
        else{
          setUser(null);
        }
      })
    },[])
    return user
  }
  const loggeduser = GetCurrentUser();

  const[cartdata, setcartdata] = useState([]);

  if(loggeduser) {
    const getcartdata = async () => {
      const cartArray = [];
      const path = `cart-${loggeduser[0].uid}`
      getDocs(collection(db, path)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cartArray.push({ ...doc.data(), id: doc.id})
        });
        setcartdata(cartArray)
      }).catch('Error error error')
    }
    getcartdata()
  }

  const navigate = useNavigate();
  const backtoshop = () => {
    navigate("/");
  }

  const checkout = () => {
    navigate("/checkout")
  }

  return (
    <div>
      <div className="sec-heading">
        Shopping Cart    
      </div> 
      {cartdata.length != 0 ? 
        (<div>
          <div className='cart-head'>
          <div>
        <section>
          <Row>
            <table>
            <thead>
                <tr className='tr-1'>
                  <th>Image</th>
                  <th>Title</th>
                  </tr>
                  <tr className='tr-3'><th>Qty</th></tr>
                  
                  <tr className='tr-2'>
                  <th />
                  <th />
                  <th>Price</th>
            
                  <th>Delete</th>
                </tr>
              </thead>
            </table>
          </Row>
          </section>
          <div className='divider' />
        </div> 
            {cartdata.map((item)=> (
              <CartCard 
              key={item.id} 
              itemdata={item}
              userid={loggeduser[0].uid}
              />
            ))}
          </div> 
          <div>
            <button className='--btn --btn-primary --btn-shop ' onClick={backtoshop} > Back To Shop </button>
            <button className='--btn --btn-primary ' onClick={checkout} > Checkout </button>
          </div>
        </div>
        ) 
        : (
          <h3> &nbsp;&nbsp;&nbsp;Your Cart is Empty</h3>
        )}
    </div>
  )
}

export default Cart