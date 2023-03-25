import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase/config';
import SpecificProduct from './SpecificProduct';

const AllProduct = (props) => {

    const [products, setProducts] =  useState([]);
    
    useEffect(() =>{
      const getProducts = () => {
        const productsArray = [];
        const path = `products-${props.type.toUpperCase()}`;
        console.log(path);
    
        getDocs(collection(db, path)).then((querySnapshot) => {
          querySnapshot.forEach((doc)=> {
            productsArray.push({...doc.data(),id:doc.id})
          })
          setProducts(productsArray)
        }).catch((error) => {
          console.log(error.message);
        })
      }
      getProducts()
    }, [])
    
      return (
        <div>
          {products.map((product) => (
            <SpecificProduct 
            key = {product.id}
            product={product}/>
          ))}
        </div>
        
      )
    }    

export default AllProduct