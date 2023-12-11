import { snackbarSlice } from "./slice";
export const {showMessage, hideMessage} = snackbarSlice.actions;
export const snackbarReducer = snackbarSlice.reducer;