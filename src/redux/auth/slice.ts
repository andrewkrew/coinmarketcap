import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
	"authorization"?: boolean
	"refreshToken"?: string,
	"accessToken"?: string,
	"email"?: string,
	"id": string,
	"error"?: unknown
}

	const initialState: AuthState = {
		"authorization": false,
		"id": '',
		"refreshToken": '',
		"accessToken": '',
		"email": '',
	}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action) {
			state.email = action.payload.email;
			state.id = action.payload.id;
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
			state.authorization = action.payload.authorization;
			state.error = action.payload.error;
		},
		removeUser(state) {
			state.email = '';
			state.id = '';
			state.accessToken = '';
			state.refreshToken = '';
			state.authorization = false;
			state.error = '';
		},
		setAuthError(state, action) {
			state.error = action.payload;
		},
	},
})