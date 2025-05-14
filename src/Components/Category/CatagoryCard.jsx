import React from "react";
import classes from "./category.module.css";
import { Link } from "react-router-dom";

function CatagoryCard({ data }) {
  return (
    <div className={classes.catagory}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data?.titile}</h2>
        </span>
        <img src={data?.imaglink} alt="" />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard;