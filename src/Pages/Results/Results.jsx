import React, { useState, useEffect } from 'react'
import classes from './Results.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import Productcard from '../../Components/Product/ProductCard';
import Loader from '../../Components/loader/Loader';

function Results() {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios.get(`${productUrl}/products/category/${categoryName}`)
    .then((res) => {
      setResults(res.data);
      setIsLoading(false);
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    })
  }, []);


  return (
    <LayOut>
      <section>
        <h1 style={{padding:"30px"}}>Results</h1>
        <p style={{padding: "30px"}}>Category / {categoryName}</p>
        <hr />
        {
          isLoading? (<Loader />) : (
            <div className={classes.products_container}>
          {results?.map((product) => {
            return (
              <Productcard
              key={product.id}
              product={product}
              renderDesc={false}
              renderadd={true}
            />
            );
          })}

        </div>
          )
        }
        
        </section>
    </LayOut>
    
  );
}

export default Results;