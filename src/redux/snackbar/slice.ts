import { createSlice } from "@reduxjs/toolkit"

interface InitialState {
	isOpen: boolean,
	message: string,
}

const initialState: InitialState = {
	isOpen: false,
	message: '',
}

export const snackbarSlice = createSlice({
	name: 'snackbar',
	initialState,
	reducers: {
		showMessage: (state, action) => {
			state.isOpen = true;
			state.message = action.payload;
		},
		hideMessage: (state) => {
			state.isOpen = false;
			state.message = '';
		}
	}
})