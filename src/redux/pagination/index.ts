import { paginationSlice } from "./slice";
export const { setCoinsQnty, setExchangesQnty } = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;