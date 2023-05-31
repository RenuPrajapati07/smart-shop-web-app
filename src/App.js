import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//components
import {Header, Footer, AddProduct} from "./components"
//pages
import {Home, Contact, Login, Register, Reset, Admin, Cart, ProductSlider, AllProduct, Checkout, OrderHistory, ChatTalk} from "./pages";
import SpecificProduct from "./pages/products/product/SpecificProduct"

function App() {
  
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
      <Header/>
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/contacts"  element={<Contact />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product-slider" element={<ProductSlider />} />
          <Route path="/product-type/men" element={<AllProduct type={'Mens Wear'} />} />
          <Route path="/product-type/women" element={<AllProduct type={'Womens Wear'} />} />
          <Route path="/product/:type/:id" element={<SpecificProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/myorder" element={<OrderHistory />} />
          <Route path="/chattalk" element={<ChatTalk />} />
        </Routes>
        
      <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
