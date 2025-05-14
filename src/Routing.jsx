import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing/Landing';
import Payment from './Pages/Payment/Payment';
import Orders from './Pages/Orders/Orders';
import Cart from './Pages/Cart/Cart';
import Results from './Pages/Results/Results';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Auth from './Pages/Auth/Auth';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const stripePromise = loadStripe(
  "pk_test_51ROBv305dlJ2xtHQBZPdF0IStnCjk9mcYioAGhbp1tPmFXV229aHeZSxUnA7PyY7I85RCmzIiAQDVNvCW7wPmlep00VvhgNYDV"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/payments" element={
          <ProtectedRoute msg={"You must login to Pay"} redirect={"/payments"}>
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
          </ProtectedRoute>
          } />
      
          
        <Route path="/orders" element={
                 <ProtectedRoute msg={"You must login to access your orders"} redirect={"/orders"}>
                 <Orders />
                 </ProtectedRoute>
         } />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail/>} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  )
}

export default Routing;