import { createSlice } from '@reduxjs/toolkit'
// import { checkAuthThunk, loginThunk, logoutThunk } from './thunk'
interface AuthState {
	"authorization"?: boolean
	"refreshToken"?: string,
	"accessToken"?: string,
	"email"?: string,
	"id": string,
	"error"?: unknown
}

	const initialState: AuthState = {
		// "refreshToken": localStorage.getItem("refreshToken") || undefined,
		// "accessToken": localStorage.getItem("accessToken") || undefined,
		// "email": localStorage.getItem("userName") || undefined,
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
		}
	},
	// extraReducers: (builder) => {
	// 	builder.addMatcher(loginThunk.fulfilled.match, (_, action) => {
	// 		if (action.payload.response.success) {
	// 			localStorage.setItem("refreshToken", action.payload.response.data.refreshToken)
	// 			localStorage.setItem("accessToken", action.payload.response.data.accessToken)
	// 			localStorage.setItem("email", action.payload.login)
	// 			return {
	// 				accessToken: action.payload.response.data.accessToken,
	// 				refreshToken: action.payload.response.data.refreshToken,
	// 				authorization: true,
	// 				emeil: action.payload.login,
	// 			}
	// 		} else {
	// 			return {
	// 				error: action.payload.response.error,
	// 				authorization: false
	// 			}
	// 		}
	// 	})
	// 	builder.addMatcher(loginThunk.rejected.match, (_, action) => {
	// 		return {
	// 			error: action.error.message,
	// 			authorization: false
	// 		}
	// 	})
	
	// 	builder.addMatcher(checkAuthThunk.fulfilled.match, (state, action) => {
	// 		state.authorization = action.payload
	// 	})
	// 	builder.addMatcher(checkAuthThunk.rejected.match, (state) => {
	// 		state.authorization = false
	// 	})

	// 	builder.addMatcher(logoutThunk.fulfilled.match, () => {
	// 		localStorage.removeItem("refreshToken");
	// 		localStorage.removeItem("accessToken");
	// 		localStorage.removeItem("email");
	// 		return {
	// 			emeil: '',
	// 			authorization: false,
	// 			refreshToken: undefined,
	// 			accessToken: undefined,
	// 			error: '',
	// 		}
	// 	})
	// }
})