import React, { useEffect, useState } from 'react'
import '../../components/addProduct/AddProduct.scss'
import { ToastContainer, toast } from 'react-toastify'
import { auth, db, storage } from '../../firebase/config';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Contact = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [message, setMessage ] = useState("");

    function GetCurrentUser() {
        const [user, setUser] = useState('')
        const usersCollectionRef = collection(db, "users")
    
        useEffect(() => {
          auth.onAuthStateChanged(userlogged => {
            if(userlogged) {
              const getUsers = async () => {
                const q = query(usersCollectionRef, where("uid","==",userlogged.uid))
               
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

  const contactform = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `contact-form${name.toUpperCase()}/${Date.now()}`)
        //console.log(storageRef._location.path)
        uploadBytes(storageRef, name)
            .then(() => {
                getDownloadURL(storageRef).then(url => {
                    addDoc(collection(db, `contacts-${name.toUpperCase()}`),{
                        name,
                        email,
                        phonenumber,
                        message,                    
                    })
                })
            })
    toast.success("Form submitted successfully")
  }
  
  return (
    
    <div>
      <ToastContainer />
      <div className='addprod-container'>
                <form className='addprod-form' onSubmit={contactform}>
                    <p>Contact Us</p>
                    <label>Name</label>
                    <input type="text" onChange={(e)=>{setName(e.target.value) }}
                     placeholder="Username" />

                    <label>Email</label>
                    <input type="text" onChange={(e)=>{setEmail(e.target.value) }}
                     placeholder="Email adress" />

                    <label>Phone Number</label>
                    <input type="text" onChange={(e)=>{setPhonenumber(e.target.value) }}
                     placeholder="Phone number" />

                    <label>How may we help you?</label>
                    <textarea onChange={(e)=>{setMessage(e.target.value) }}
                    placeholder="Help me understand how can I help you?"></textarea>

                    <button type='submit' className='--btn --btn-primary --btn-block'>Submit</button>
                </form>
            </div>
    </div>
  )
}

export default Contact