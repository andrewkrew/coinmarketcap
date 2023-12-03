// import { createAsyncThunk } from '@reduxjs/toolkit'
// // import authApi from '../../shared/api/auth'

// export const loginThunk = createAsyncThunk(
// 	'auth/login',
// 	async ({ login, password }: { login: string; password: string }, {rejectWithValue} ) => {
// 		try {
// 			const response = await authApi.login(login, password)
// 			return {response, login}
// 		}
// 		catch(error) {
// 			return rejectWithValue(error)
// 		}
// 	}
// )

// export const checkAuthThunk = createAsyncThunk(
// 	'auth/checkAuth',
// 	async (_, {rejectWithValue}) => {
// 		if(!localStorage.getItem('accessToken')) {
// 			return false
// 		}
// 		try {
// 			const response = await authApi.check()
// 			return response.success
// 		}
// 		catch (error) {
// 			return rejectWithValue(error)
// 		}
// 	}
// )

// export const logoutThunk = createAsyncThunk(
// 	'auth/logout',
// 	async (_, {rejectWithValue}) => {
// 		try {
// 			await authApi.logout();
// 		}
// 		catch (error) {
// 			return rejectWithValue(error)
// 		}
// 	}
// )