import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultValue = {
  CartItem: [],
  numItemsInCart: 0,
  cartTotal: 0,
};

const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultValue;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCart(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;

      const item = state.CartItem.find((i) => i.cartId === product.cartId);
      if (item) {
        item.amount += product.amount;
      } else {
        state.CartItem.push(product);
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;

      localStorage.setItem("cart", JSON.stringify(state));
      toast.success(`Item ${product.name} added to cart`);
    },
    editItem: (state, action) => {
      // cartId berasal dari component CartListItem
      const { cartId, amount } = action.payload;
      const itemProduct = state.CartItem.find((i) => i.cartId === cartId);

      state.numItemsInCart += amount - itemProduct.amount;
      state.cartTotal += itemProduct.price * (amount - itemProduct.amount);
      itemProduct.amount = amount;

      localStorage.setItem("cart", JSON.stringify(state));
      toast.success(`Quantity of item ${itemProduct.name} updated`);
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultValue));
      return defaultValue;
    },
    removeItem: (state, action) => {
      // cartId berasal dari component CartListItem
      const { cartId } = action.payload;
      const itemProduct = state.CartItem.find((i) => i.cartId === cartId);
      state.CartItem = state.CartItem.filter((i) => i.cartId !== cartId);

      state.numItemsInCart -= itemProduct.amount;
      state.cartTotal -= itemProduct.price * itemProduct.amount;
      localStorage.setItem("cart", JSON.stringify(state));
      toast.success(`Item ${itemProduct.name} removed from cart`);
    },
  },
});

export const { addItem, editItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
