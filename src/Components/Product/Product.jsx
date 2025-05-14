import React, { useState, useEffect } from "react";
import axios from "axios";
import Productcard from './ProductCard';
import classes from "./product.module.css";

function Product() {
  const [product, setProduct] = useState([]); // Initialize with empty array

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={classes.product_container}>
      {product.map((singleProduct) => (
        <Productcard product={singleProduct} key={singleProduct.id} />
      ))}
    </div>
  );
}

export default Product;