import { createSlice } from "@reduxjs/toolkit"

interface Theme {
	theme: 'light' | 'dark',
}

const initialState: Theme = {
	theme: 'light',
}

export const themeToggleSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.theme === 'light' 
				? state.theme = 'dark'
				: state.theme = 'light'
		}
	}
})