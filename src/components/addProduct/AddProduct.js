import React, { useState, useEffect} from 'react'
import { storage, auth, db } from '../../firebase/config'
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import './AddProduct.scss'
import { toast, ToastContainer } from 'react-toastify'

const Addproduct = () => {
// hooks
    const [producttitle, setProductTitle] = useState("");
    const [producttype, setProductType] = useState("");
    const [productdescription, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [productimage, setProductImage] = useState("");

    const [imageError, setImageError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [uploadError, setUploadError ] = useState("");


    function GetCurrentUser() {
        const [user, setUser] = useState('')
        const usersCollectionRef = collection(db, "users")
    
        useEffect(() => {
          auth.onAuthStateChanged(userlogged => {
            if(userlogged) {
              const getUsers = async () => {
                const q = query(usersCollectionRef, where("uid","==",userlogged.uid))
               console.log(q)
                const data = await getDocs(q);
                setUser(data.docs.map((doc) => ({...doc.data(),id:doc.id})))
              }
              getUsers();
            }
            else{
              setUser(null);
            }
          })
        },[user])
        return user
    }

    const types = ['images/jpg','image/jpeg','image/png','image/PNG']

    const handleProductImg = (e) => {
        e.preventDefault();
        let selectedFile = e.target.files[0];

        if(selectedFile) {
            if(selectedFile && types.includes(selectedFile.type)){
                setProductImage(selectedFile);
                setImageError('')
            }
            else{
                setProductImage(null)
                setImageError('please select a valid image file type (png or jpg)')
            }
        }
        else{
            setImageError('please select your file')
        }
    }

    const loggeduser = GetCurrentUser();

    const handleAddProduct = (e) => {
        e.preventDefault();
        const storageRef = ref(storage, `product-images${producttype.toUpperCase()}/${Date.now()}`)
        //console.log(storageRef._location.path)
        uploadBytes(storageRef, productimage)
            .then(() => {
                getDownloadURL(storageRef).then(url => {
                    addDoc(collection(db, `products-${producttype.toUpperCase()}`),{
                        producttitle,
                        producttype,
                        productdescription,
                        brand,
                        price,
                        productimage: url                        
                    })
                })
            })
            toast.success("Product Added")
    }

    const successMessage = (e) => {
        e.preventDefault();
        setSuccessMsg(toast.success("Product added to product page"));
    }

    const uploadingError = (e) => {
        e.preventDefault();
        setUploadError(toast.error("Error in uploading.."));
    }

  return (
    <>
    <ToastContainer />
    <div>
            <div className='addprod-container'>
                <form className='addprod-form' onSubmit={handleAddProduct}>
                    <p>Add Data</p>
                    {successMsg && <div className='success-msg'>{successMessage}</div>}
                    {uploadError && <div className='error-msg'>{uploadingError}</div>}
                    <label>Product Title</label>
                    <input type="text" onChange={(e)=>{setProductTitle(e.target.value) }}
                     placeholder="Product Title" />

                    <label>Product Type</label>
                    <input type="text" onChange={(e)=>{setProductType(e.target.value) }}
                     placeholder="Product Type" />

                    <label>Brand Name</label>
                    <input type="text" onChange={(e)=>{setBrand(e.target.value) }}
                     placeholder="Brand Name" />

                    <label>Image</label>
                    <input onChange={handleProductImg} type="file" />
                    {imageError && <> 
                        <div className='error-mmsg'>{imageError}</div>
                    </>}

                    <label>Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe  your product in brief"></textarea>

                    <label>Price in Rupees</label>
                    <input onChange={(e) => setPrice(e.target.value)} type="text"
                    placeholder='Enter Price in rupees' />

                    <button type='submit' className='--btn --btn-primary --btn-block'>Add</button>
                </form>
            </div> 
        </div>
        </>
  )
}

export default Addproduct