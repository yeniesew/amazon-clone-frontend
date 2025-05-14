
import React, {useContext, useState} from 'react'
import classes from './Payment.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios'
import { grey } from '@mui/material/colors';
import { ClipLoader} from 'react-spinners';
import { db } from '../../Utility/firebase';
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
function Payment() {
  const [{user, basket},dispatch] = useContext(DataContext);


  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);


  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  
  const[processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e?.error?.message?setCardError(e?.error?.message):setCardError("");
  }

  const handlePayment = async(e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // backend || function ---> contact to the clinet_secret
      const response = await axiosInstance({
        method: "post",
        url: `/payments/create?total=${total * 100}`
      });

      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      // clint side (react side conformation)
      const {paymentIntent} = await stripe.confirmCardPayment
      (clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });
      console.log(paymentIntent);
//after the conformation ---> order firebase db save, clear basket
      await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent?.id).set({
        basket: basket,
        amount: paymentIntent?.amount,
        created: paymentIntent?.created,
      });
// empity the basket
      dispatch({
        type: Type.EMPITY_BASKET
      });
      setProcessing(false);
      navigate("/orders", { state: { msg: "you have successfully placed your order"}});

    } catch (error) {
      console.log(error);
      setProcessing(false);
      
    }
     
    
  }

  return (
    <LayOut>
      <div className={classes.payment_header}>
        Checkout ({totalItem}) items
      </div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React lane</div>
            <div>Los Angeles, CA</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {
            basket?.map((item) => <ProductCard product={item} flex={true} />)

            }
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError &&(
                  <small style={{color: "red"}}>{cardError}</small>)} 
                <CardElement onChange={handleChange}/>

                <div className={classes.payment_price}>
                  <div>
                    <span style={{display: "flex", gap: "10px"}}>
                      <p>Total Order | </p> <CurrencyFormat amount={total}/>

                    </span>
                  </div>
                  <button type='submit'>
                    {
                      processing ? (
                        <div className={classes.loading}>
                          <ClipLoader color={grey} size={12} /> <p>Please Wait...</p>
                        </div>
                      ) : "Pay Now"
                    }
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </section>
    </LayOut>
    
  )
}

export default Payment;
