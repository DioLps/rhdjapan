import { createAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

export interface ProductModel {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

// Type for our state
export interface ProductsState {
  productsState: Array<ProductModel>;
}

// Initial state
const initialState: ProductsState = {
  productsState: [],
};

const hydrateAction = createAction("HYDRATE");

// Actual Slice
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Action to set the authentication status
    setProductsState(state, action) {
      state.productsState = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(hydrateAction, (state, action: any) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    // and provide a default case if no other handlers matched
    // .addDefaultCase((state, action) => {})
  },
});

export const { setProductsState } = productsSlice.actions;

export const selectProductsState = (state: AppState) =>
  state.products.productsState;

export default productsSlice.reducer;
