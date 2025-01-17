import React from "react";
import { useSelector } from "react-redux";
import CartListItem from "./CartListItem";

const CartList = () => {
  const cartItems = useSelector((state) => state.cartState.CartItem);
  return (
    <>
      {cartItems.map((item) => {
        return <CartListItem key={item} item={item} cartItem={item} />;
      })}
    </>
  );
};

export default CartList;
