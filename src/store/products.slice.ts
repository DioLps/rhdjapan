import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import ProductService from "@/services/product.service";

export const getProductsList = createAsyncThunk(
  "products/getProductsList",
  async () => ProductService.getList()
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id: number) => ProductService.getProductById(id)
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
  selectedProduct: ProductModel | null;
  isLoading: boolean;
  errors: string | null;
}

// Initial state
const initialState: ProductsState = {
  productsList: [],
  selectedProduct: null,
  isLoading: false,
  errors: null,
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
          errors: null,
        };
      })
      .addCase(getProductsList.fulfilled, (state, { payload }) => {
        return {
          ...state,
          productsList: payload,
          isLoading: false,
          errors: null,
        };
      })
      .addCase(getProductsList.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          errors: action.error.message || null,
        };
      })
      .addCase(getProductById.pending, (state) => {
        return {
          ...state,
          selectedProduct: null,
          isLoading: true,
          errors: null,
        };
      })
      .addCase(getProductById.fulfilled, (state, { payload }) => {
        return {
          ...state,
          selectedProduct: payload,
          isLoading: false,
          errors: null,
        };
      })
      .addCase(getProductById.rejected, (state, action) => {
        return {
          ...state,
          selectedProduct: null,
          isLoading: false,
          errors: action.error.message || null,
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
