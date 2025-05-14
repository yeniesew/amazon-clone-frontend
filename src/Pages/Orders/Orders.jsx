import React, { useContext, useState, useEffect, use } from "react";
import classes from "./Orders.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { db } from "../../Utility/firebase";
import Productcard from "../../Components/Product/ProductCard";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders?.length === 0 && <div style={{padding:"20px"}}> You don't have orders yet.</div>}
          {/* ordered items */}
          <div>
            {
              orders?.map((eachOrder,i) => {

                return (
                  <div key={i}>
                    <hr />
                    <p>Order ID: {eachOrder?.id}</p>{
                      eachOrder?.data?.basket?.map((order) => {
                       return( <Productcard flex={true} product={order} key={order.id}/>)
                      }
                        )
                      }
                    
                  </div>
                )

              })
            }
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;