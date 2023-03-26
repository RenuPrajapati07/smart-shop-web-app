import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { FaCartPlus, FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterest, FaTwitter } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { auth, db } from '../../../firebase/config';
import { cartActions } from '../../../redux/slice/cartSlice';
import '../../singleProduct/SingleProduct.scss';
import ProductSlider from './ProductSlider';

const SpecificProduct = () => {

    const {type, id} = useParams()
    const [product, setProduct] = useState('');
    
    //console.log(id,type)
    function GetCurrentUser() {
        const [user, setUser] = useState('')
    
        useEffect(() => {
          auth.onAuthStateChanged(userlogged => {
            if(userlogged) {
              const getUsers = async () => {
                const q = query(collection(db,"users"), where("uid","==",userlogged.uid))
               //console.log(q)
                const data = await getDocs(q);
                setUser(data.docs.map((doc) => ({...doc.data(),id:doc.id})))
              }
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
      if(loggeduser){console.log(loggeduser[0].uid)}  
    

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

        if(loggeduser) {
            /*dispatch(
                cartActions.addToCart({
                    id: product.id,
                    productName: product.producttitle,
                    price: product.price,
                    imgUrl: product.productimage,
                })
            );*/
            addDoc(collection(db, `cart-${loggeduser[0].uid}`),{
                product, quantity: 1
            }).then(() => {
                toast.success('Product added to cart');

            }).catch((error) => {toast.error(error.message)});

        }

        else{
            toast.error('You need to login first')
        }
        
       
        //navigate("/cart");
        //console.log(product.id, product.producttitle)
        
        
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
                            
                            <button
                                className="--btn add-to-cart-button"
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