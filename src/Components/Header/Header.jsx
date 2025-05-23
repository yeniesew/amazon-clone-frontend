import React, { use, useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

function Header() {

  const [{user, basket}, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          <div className={classes.logo__container}>
            <Link to ="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text"/> 
            <BsSearch size={38} />
          </div>
          <div className={classes.order__container}>
            <Link to ="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-flag_of_the_united_states.svg.png"
                alt=""
              />
              <select>
                <option value="">EN</option>
              </select>
            </Link>
            <Link to ={!user && "/auth"}>
            <div>
              {
                user ?(
                  <>
                  <p>Hello {user?.email?.split("@")[0]}</p>
                  <span onClick={()=>auth.signOut()}>Sign Out</span>
                  </>
                ):(
                  <>
                  <p>Hello, Sign In</p>
                  <span>Account & Lists</span>
                  </>
                )}
            </div>
            </Link>
            <Link to ="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            <Link to ="/cart" className={classes.cart}>
                <BiCart size={25} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader/>
    </section>
  );
}

export default Header;