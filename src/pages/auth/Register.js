import React from 'react'
import { useState } from 'react'
import styles from './auth.module.scss'
import registerImg from '../../assets/register.png'
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase/config'
import Loader from '../../components/loader/Loader'
import { toast } from 'react-toastify'
import { addDoc, collection } from 'firebase/firestore'

const Register = () => {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[cPassword, setCPassword] = useState("");
    const[isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const registerUser = (e) => {
        e.preventDefault();
        if (password !== cPassword) {
            toast.error("Passwords do not match");
        }
        setIsLoading(true)

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const initialcartvalue=0;
            const user = userCredential.user;
            console.log(user)
            addDoc(collection(db,"users"),{
                 email: email, password: password, cart: initialcartvalue, uid: user.uid})
            setIsLoading(false)
            toast.success("Registration Successful...")
            navigate("/login")
            
        })
        .catch((error) => {
            toast.error(error.message)
            setIsLoading(false);
        });
    };

  return (
    <>
    {isLoading && <Loader /> }
    <section className={`container ${styles.auth}`}>
        
        <Card>
        <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
                <input 
                    type="text" 
                    placeholder="Email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    required
                    value={cPassword} 
                    onChange={(e) => setCPassword(e.target.value)} 
                />
                <button type="submit" className="--btn --btn-primary --btn-block">Register</button>
            </form>

            <span className={styles.register}>
                <p>Already have an account? &nbsp;</p>
                <Link to="/login" className={styles.fontregister}>Login</Link> 
            </span>
            
        </div>
        </Card>
        <div className={styles.img}>
            <img src={registerImg} alt="Register" width="550"/>
        </div>
    </section>
    
    </>
  )
}

export default Register