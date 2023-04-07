import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import ProductService from "@/services/product.service";

export const getProductsList = createAsyncThunk(
  "products/getProductsList",
  async () => ProductService.getList()
);
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
  productsList: Array<ProductModel>;
  isLoading: boolean;
  errors: string | undefined;
}

// Initial state
const initialState: ProductsState = {
  productsList: [],
  isLoading: false,
  errors: undefined,
};

const hydrateAction = createAction(HYDRATE);

// Actual Slice
export const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    // Action to set the authentication status
    setProductsState(state, action) {
      state.productsList = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder
      .addCase(hydrateAction, (state, action: any) => {
        return {
          ...state,
          ...action.payload,
        };
      })
      .addCase(getProductsList.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          errors: undefined,
        };
      })
      .addCase(getProductsList.fulfilled, (state, { payload }) => {
        return {
          ...state,
          productsList: payload,
          isLoading: false,
          errors: undefined,
        };
      })
      .addCase(getProductsList.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          errors: action.error.message,
        };
      });

    // and provide a default case if no other handlers matched
    // .addDefaultCase((state, action) => {})
  },
});

export const { setProductsState } = productsSlice.actions;

export const selectAllProducts = (state: AppState) =>
  state.productsSlice.productsList;

export default productsSlice.reducer;
