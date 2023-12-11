import { authSlice } from './slice'
export const { setUser, removeUser } = authSlice.actions;
export const authReducer = authSlice.reducer;