import React, {useState, useEffect} from 'react'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css"
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import SliderProductCard from './SliderProductCard'

const ProductSlider = (props) => {

    const [products, setProducts] =  useState([]);

useEffect(() => {
    const getProducts = () => {
    const productsArray = [];
    const path = `products-${props.type.toUpperCase()}`;
    //console.log(props);

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
}, [props])

const responsive = {
    men: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    women: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    shoes: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    gadgets: {
      breakpoint: { max: 464, min: 0},
      items: 2
    },
  };

  return (
    <div>
        
  <Carousel responsive={responsive}>
    {products.map((product) => (
        <SliderProductCard key={product.id} product={product}/>
    ))}
  </Carousel>;

    </div>
  )
}

export default ProductSlider