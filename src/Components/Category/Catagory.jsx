import React from "react";
import { catagoryInfos } from "./CatagoryfullInfos";
import CatagoryCard from "./CatagoryCard";
import classes from "./category.module.css";

function Catagory() {
  return (
    <section className={classes.catagory_container}>
      {catagoryInfos?.map((info, i) => {
        return <CatagoryCard key={i} data={info} />;
      })}
    </section>
  );
}

export default Catagory;