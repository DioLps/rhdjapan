import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import CurrencyService from "@/services/currency.service";

export const convert = createAsyncThunk(
  "currencys/convert",
  async (payload: ConvertCurrencyPayloadModel) => {
    const { to, from, amount } = payload;
    return CurrencyService.convert(to, from, amount);
  }
);

export interface ConvertCurrencyPayloadModel {
  to: string;
  from: string;
  amount: number;
}

// Type for our state
export interface currencysState {
  selectedCurrencyValue: number;
  selectedCurrencyLabel: string;
  isLoading: boolean;
  errors: string | null;
}

// Initial state
const initialState: currencysState = {
  selectedCurrencyValue: 0,
  selectedCurrencyLabel: "USD",
  isLoading: false,
  errors: null,
};

const hydrateAction = createAction(HYDRATE);

// Actual Slice
export const CurrencySlice = createSlice({
  name: "currencySlice",
  initialState,
  reducers: {
    // Action to set the authentication status
    setCurrencysValueState(state, action) {
      state.selectedCurrencyValue = action.payload;
    },
    setCurrencysLabelState(state, action) {
      state.selectedCurrencyLabel = action.payload;
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
      .addCase(convert.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          errors: null,
        };
      })
      .addCase(convert.fulfilled, (state, { payload }) => {
        return {
          ...state,
          selectedCurrencyValue: payload.toFixed(2),
          isLoading: false,
          errors: null,
        };
      })
      .addCase(convert.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          errors: action.error.message || null,
        };
      });

    // and provide a default case if no other handlers matched
    // .addDefaultCase((state, action) => {})
  },
});

export const { setCurrencysLabelState, setCurrencysValueState } =
  CurrencySlice.actions;

export const selectCurrencyLabel = (state: AppState) => state.currencySlice.selectedCurrencyLabel;
export const selectCurrencyValue = (state: AppState) => state.currencySlice.selectedCurrencyValue;
 

export const isLoadingPrice = (state: AppState) =>
  state.currencySlice.isLoading;

export default CurrencySlice.reducer;
