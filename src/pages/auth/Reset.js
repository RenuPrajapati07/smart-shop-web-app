import React from 'react'
import { Link } from 'react-router-dom'
import resetImg from '../../assets/resetPassword.png'
import Card from '../../components/card/Card'
import styles from './auth.module.scss'
import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'


const Reset = () => {

  const[email, setEmail] = useState("");
  const[isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
    .then(() => {
      setIsLoading(false);
      toast.success("Check your email for reset link")
      
    })
    .catch((error) => {
      setIsLoading(false);
      toast.error(error.message)
      
    });
  }

  return (
    <>
    {isLoading && <Loader />}
    <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
            <img src={resetImg} alt="Reset Img" width="450"/>
        </div>
        <Card>
        <div className={styles.form}>
            <h2>Reset Password</h2>
            <form onSubmit={resetPassword}>
                <input type="text" placeholder="Email" required onChange={(e) => setEmail(e.target.value)}/>
                
                <button type="submit" className="--btn --btn-primary --btn-block">Reset Password</button>
                <div className={styles.links}>
                  <p>
                    <Link to="/login" className={styles.fontregister}>- Login</Link>
                  </p>
                  <p>
                    <Link to="/register" className={styles.fontregister}>- Register</Link>
                  </p>
                </div>  
                
            </form>  
        </div>
        </Card>
    </section>
    </>
  )
}

export default Reset