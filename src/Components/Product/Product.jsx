import React, { useState, useEffect } from "react";
import axios from "axios";
import Productcard from './ProductCard'
import classes from './Product.module.css';
import Loader from "../loader/Loader";

function Product() {
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        //console.log(res);
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
     {
     isLoading? (<Loader />) : (
      <div className={classes.product_container}>
          {product?.map((singleProduct) => (
            <Productcard product={singleProduct} key={singleProduct.id} renderadd={true} />
          ))}
        </div>
     )
     }
        
    </>
  );
}

export default Product;