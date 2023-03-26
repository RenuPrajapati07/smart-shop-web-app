import {useEffect, useState} from 'react';
import styles from './Header.module.scss'
import { Link, NavLink, useNavigate} from 'react-router-dom';
import {FaShoppingCart, FaTimes, FaUserCircle} from 'react-icons/fa';
import {HiOutlineMenu} from 'react-icons/hi'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import { REMOVE_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnAdminLogin, ShowOnLogout } from '../hiddenLink/hiddenLink';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Header = () => {

  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  //const [showSearch, setShowSearch] = useState(false);
  
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()


  //monitor current signed in user  
  useEffect (() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        if(user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        }
        else {
        setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email:user.email,
            userName:user.displayName ? user.displayName : displayName,
            userID:user.uid,  
        }))
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  },[dispatch, displayName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  };

  const hideMenu = () => {
    setShowMenu(false)
  };

  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("Logout successfully.");
      navigate("/");
    }).catch((error) => {
      toast.error(error.message);
    });
    
  }

  const adminUser = (e) => {
    e.preventDefault();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        if(user.displayName === "renu prajapati") {
          
          toast.success("Admin Login Successful...")
          navigate("/admin")
        }
      } 
    });
  }

  const logo = (
    <div className={styles.logo}>
      <Link to='/'>
        <h2> 
          Smart<span>Shop</span>.
        </h2>
      </Link>
    </div>
  )

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

  const cart = (
    <span className={styles.cart} onClick={() => setShowCart(true)}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20}/>
        <ShowOnLogin>
        <p>{cartdata.length}</p>
        </ShowOnLogin>
      </Link>
    </span>
  )

  const activeLink = ({ isActive })=>
  (isActive ? `${styles.active}` : "")

  return (
    <>
    <ToastContainer/>
    <header>
      <div className={styles.header}>
        {logo}

        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
          <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`: `${styles["nav-wrapper"]}`} 
          onClick={hideMenu}>
          </div>
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu}/>
            </li>
            
            <li>
              <NavLink to="/"  className={activeLink}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/contacts" className={activeLink}>Contact Us</NavLink>
            </li>
          </ul>

          <div className={styles['header-right']} onClick={hideMenu}>
            <span className={styles.links}>
            
              <ShowOnAdminLogin>
              <a href='/admin' style={{display: 'inline-block'}}>
               <button type="submit" className="--btn --btn-primary" onClick={adminUser}>Admin</button>  
              </a>
              </ShowOnAdminLogin>
                
              <ShowOnLogout>
              <NavLink to="/login" className={activeLink}>Login</NavLink>
              </ShowOnLogout>

              <ShowOnLogin>
              <a href='#profile' style={{color: "#0FE8CD"}}>
                <FaUserCircle size={16}/>
                Hi, {displayName}
              </a>
              </ShowOnLogin>

              <ShowOnLogout>
              <NavLink to="/register" className={activeLink}>Register</NavLink>
              </ShowOnLogout>

              <ShowOnLogin>
              <NavLink to="/order-history" className={activeLink}>My Order</NavLink>
              </ShowOnLogin> 

              <ShowOnLogin>
              <NavLink to="/" onClick={logoutUser} >Logout</NavLink>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
          
        </nav>
        
        <div className={styles["menu-icon"]}>
          <ShowOnLogin>
            {cart}
          </ShowOnLogin>
          <HiOutlineMenu size={28} onClick={toggleMenu}/>
        </div>
      </div>
    </header>
    </>
  )
}

export default Header