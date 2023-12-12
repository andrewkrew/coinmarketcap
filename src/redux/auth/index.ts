import { authSlice } from './slice'
export const { setUser, removeUser, setAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;