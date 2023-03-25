import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { FaCartPlus, FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterest, FaTwitter } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { db } from '../../../firebase/config';
import { cartActions } from '../../../redux/slice/cartSlice';
import '../../singleProduct/SingleProduct.scss';
import ProductSlider from './ProductSlider';

const SpecificProduct = () => {

    const {type, id} = useParams()
    const [product, setProduct] = useState('');
    //console.log(id,type)

    function GetCurrentProduct() {
        
        useEffect(() => {
            const getProduct = async () => {
                const docRef = doc(db, `products-${type.toUpperCase()}`,id);
                const docSnap = await getDoc(docRef);
                setProduct(docSnap.data());
                
            };
            getProduct();
        },[])
        return product
    }

    GetCurrentProduct();

    const dispatch= useDispatch();
    const  handleAddToCart = () => {
        
        dispatch(
            cartActions.addToCart({
                id: product.id,
                productName: product.producttitle,
                price: product.price,
                imgUrl: product.productimage,
            })
        );
        //navigate("/cart");
        //console.log(product.id, product.producttitle)
        
        toast.success('product added to cart successfully.',{
            toastId: 'success1',
        })
    };

  return (

    <> 
        <ToastContainer />
            {product ? 
            <div className="single-product-main-content">
            <div className="layout">
                <div className="single-product-page">
                    <div className="left">
                        <img
                            src={product.productimage} alt="img"       
                        />
                    </div>
                    <div className="right">
                        <span className="name"></span>
                        <span className="price">&#8377; {product.price}</span>
                        <p>{product.producttitle}</p>
                        <span className="desc"></span>

                        <div className="cart-buttons">
                            <div className="quantity-buttons">
                                <span>-</span>
                                <span>5</span>
                                <span>+</span>
                            </div>
                            <button
                                className="add-to-cart-button"
                                onClick={() => handleAddToCart()}
                            >
                                <FaCartPlus size={20} />
                                ADD TO CART
                            </button>
                        </div>

                        <span className="divider" />
                        <div className="info-item">
                            <span className="text-bold">
                                Brand:&nbsp;
                                <span>  {product.brand}</span>
                            </span>
                            <span className="text-bold">
                                Category:&nbsp;
                                <span>  {product.producttype}</span>
                            </span><br/>
                            <span className="text-bold">
                                Description:&nbsp;
                                <span>  {product.productdescription}</span>
                            </span><br/>
                            <span className="text-bold">
                                Share:
                                <span className="social-icons">
                                    <FaFacebookF size={16} />
                                    <FaTwitter size={16} />
                                    <FaInstagram size={16} />
                                    <FaLinkedinIn size={16} />
                                    <FaPinterest size={16} />
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        : <div>Loading....</div>
        }
        <div>
        <div className="sec-heading">
            Related Products
        </div>
        <ProductSlider type={type}></ProductSlider>
        </div>
    </>
  )
}

export default SpecificProduct