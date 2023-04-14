import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cart: [],
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItens: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.item];
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload._id) {
          item.count++;
        }
        return item;
      });
    },

    // decreaseCount: (state, action) => {
    //   state.cart = state.cart.map((item) => {
    //     if (item._id === action.payload._id && item.count > 1) {
    //       item.count--;
    //     }
    //     return item;
    //   });
    // },
    
    // USING CHATGPT FOR THIS
    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload._id) {
          item.count--;
          if (item.count <= 0) {
            item = null; // marcamos o item para remoção posterior
          }
        }
        return item;
      }).filter((item) => item !== null); // removemos os itens marcados como nulos
    
      // Alternativamente, podemos usar a seguinte linha em vez do filter acima:
      // state.cart = state.cart.filter((item) => item !== null);
    },
    
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setItens,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
