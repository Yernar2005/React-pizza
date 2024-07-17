import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: number[];
  size: number[];
  rating: number;
};

interface PizzaSliceState {
  items: Pizza[];
  status: "loading" | "success" | "error";
}

type FetchPizzaArgs = {
  sortBy: string;
  order: string;
  category: string;
  currentPage: number;
  search: string;
};
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzaStatus",
  async (params: FetchPizzaArgs) => {
    const { sortBy, order, category, currentPage, search } = params;
    const { data } = await axios.get(
      `https://666dc4f97a3738f7cacd4526.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data as Pizza[];
  }
);

export const initialState: PizzaSliceState = {
  items: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<Pizza[]>) => {
        state.items = action.payload;
        state.status = "success";
      }
    );
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
