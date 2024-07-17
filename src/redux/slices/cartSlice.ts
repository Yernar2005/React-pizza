// src/redux/slices/cartSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/GetCartFromLS";
import { CalcTotalPrice } from "../../utils/CalcTotalPrice";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const CartData = getCartFromLS();
export const initialState: CartSliceState = {
  totalPrice: CartData.totalPrice,
  items: CartData.items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = CalcTotalPrice(state.items);
    },

    incrementItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count++;
      }
      state.totalPrice = CalcTotalPrice(state.items);
    },
    decrementItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem && findItem.count > 1) {
        findItem.count--;
      } else if (findItem && findItem.count === 1) {
        state.items = state.items.filter((obj) => 
          obj.id !== action.payload
        );
      }
      state.totalPrice = CalcTotalPrice(state.items);

    },

    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = CalcTotalPrice(state.items);

    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, decrementItem, incrementItem } =
  cartSlice.actions;
export default cartSlice.reducer;
