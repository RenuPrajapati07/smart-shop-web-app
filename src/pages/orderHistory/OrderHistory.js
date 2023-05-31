import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../checkout/checkout.css'
import { auth, db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';


const OrderHistory = () => {

  const navigate = useNavigate();
  const backtoshop = () => {
    navigate("/")
  }

  function GetCurrentUser() {
    const [user, setUser] = useState('')

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
      getDocs(collection(db, path)). then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cartArray.push({ ...doc.data(), id: doc.id})
        });
        setcartdata(cartArray)
      }).catch('Error error error')
    }
    getcartdata()
  }

  return (
    <div className='checkout-div'>
      <div className="sec-heading">
            My Order    
      </div>
    
      { cartdata.length == 0 ?
        <div>
          <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your order is not placed, Cart is Empty. </h3>
        </div> 
        : <div><h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your order is set for delivery......</h3></div>
      }
      <button className='--btn --btn-primary --btn-shop' onClick={backtoshop} > Back To Shop </button>
    </div>
  )
}

export default OrderHistory