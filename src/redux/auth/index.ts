import { authSlice } from './slice'
// export * from './thunk'
export const { setUser, removeUser } = authSlice.actions;
export const authReducer = authSlice.reducer;