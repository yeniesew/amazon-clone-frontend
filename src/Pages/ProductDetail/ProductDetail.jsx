
import React, {useEffect, useState} from 'react'
// import classes from './ProductDetail.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import Productcard from '../../Components/Product/ProductCard';
import Loader from '../../Components/loader/Loader';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${productUrl}/products/${productId}`)
    .then((res) => {
      setProduct(res.data);
      setIsLoading(false);
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    })
  }, []);
  return (
    <LayOut>
      {isLoading? (<Loader />) : (
         <Productcard
         product={product}
         flex = {true}
         renderDesc = {true}
         renderadd = {true}
         />
      )}
     
    </LayOut>
    
  )
}

export default ProductDetail;
