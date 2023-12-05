import { createSlice } from "@reduxjs/toolkit"

interface QntyItems {
	coinsQnty: '25' | '50' | '100',
	exchangesQnty: '25' | '50' | '100',
}

const initialState: QntyItems = {
	coinsQnty: '25',
	exchangesQnty: '25',
}

export const paginationSlice = createSlice({
	name: 'pagination',
	initialState,
	reducers: {
		setCoinsQnty: (state, actions) => {
			state.coinsQnty = actions.payload;
		},
		setExchangesQnty: (state, actions) => {
			state.exchangesQnty = actions.payload;
		}
	}
})