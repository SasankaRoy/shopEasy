import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  subTotal: 0,
};

const removeItemsFromCart = (state, id) => {
  // remove the item from the cart
  const filteredCart = state.cart.filter((cartItem) => cartItem.id !== id);
  return filteredCart;
};
const findSubTotal = (cart) => {
  return cart.reduce((sum, item) => sum + item.total, 0);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    userHasCart: (state, action) => {
      if (state.cart.length === 0) {
        state.cart.push(...action.payload);
        state.subTotal = findSubTotal(state.cart);
      }
    },
    addItemsQuantity: (state, action) => {
      // add items quantity to the user cart...
      if (state.length === 0) {
        state.cart.push(action.payload);
      } else {
        const itemExists = state.cart.find(
          (cartItem) => cartItem.id === action.payload.id
        );
        if (itemExists) {
          itemExists.productName = action.payload.productName
            ? action.payload.productName
            : itemExists.productName;
          itemExists.price = action.payload.price
            ? action.payload.price
            : itemExists.price;
          itemExists.productImage = action.payload.productImage
            ? action.payload.productImage
            : itemExists.productImage;
          itemExists.size = action.payload.size
            ? action.payload.size
            : itemExists.size;
          itemExists.color = action.payload.color
            ? action.payload.color
            : itemExists.color;
          itemExists.quantity += 1;
          itemExists.total = itemExists.price * itemExists.quantity;
        } else {
          state.cart.push(action.payload);
        }
      }
      state.subTotal = findSubTotal(state.cart);
      localStorage.setItem("userCart", JSON.stringify(state.cart));
    },
    removeItemsQuantity: (state, action) => {
      // remove items quantity from the user cart..
      const itemExists = state.cart.find(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (itemExists.quantity === 1) {
        state.cart = removeItemsFromCart(state, action.payload.id);
      } else {
        itemExists.quantity -= 1;
        itemExists.total = itemExists.total - itemExists.price;
      }
      state.subTotal = findSubTotal(state.cart);
      localStorage.setItem("userCart", JSON.stringify(state.cart));
    },
    removeItem: (state, action) => {
      state.cart = removeItemsFromCart(state, action.payload.id);
      state.subTotal = findSubTotal(state.cart);
      localStorage.setItem("userCart", JSON.stringify(state.cart));
      return state;
    },
  },
});

export const {
  addItemsQuantity,
  removeItemsQuantity,
  removeItem,
  userHasCart,
} = cartSlice.actions;
export default cartSlice.reducer;
