import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { CoinsAllData } from "../../shared/api/types";
import { fetchPortfolioCurrencyThunk, fetchSelectredTokenThunk } from "./thunk";


interface PortfolioCurrencyData {
	isLoading: boolean,
	portfolioCurrencyData: CoinsAllData[],
	selectedToken: CoinsAllData[],
	error: string | undefined,
}

const initialState: PortfolioCurrencyData = {
	isLoading: false,
	portfolioCurrencyData: [],
	selectedToken: [],
	error: '',
}

export const portfolioCurrencySlice = createSlice({
	name: 'portfolioCurrency',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addMatcher(fetchPortfolioCurrencyThunk.pending.match, (state) => {
			state.isLoading = true;
		})

		builder.addMatcher(fetchPortfolioCurrencyThunk.fulfilled.match, (state, action: AnyAction) => {
			state.isLoading = false;
			state.portfolioCurrencyData = action.payload;
			state.error = '';
		})

		builder.addMatcher(fetchPortfolioCurrencyThunk.rejected.match, (state, action: AnyAction) => {
      state.isLoading = false;
			state.error = action.payload;
    })

		builder.addMatcher(fetchSelectredTokenThunk.pending.match, (state) => {
			state.isLoading = true;
		})

		builder.addMatcher(fetchSelectredTokenThunk.fulfilled.match, (state, action: AnyAction) => {
			state.isLoading = false;
			state.selectedToken = action.payload;
			state.error = '';
		})

		builder.addMatcher(fetchSelectredTokenThunk.rejected.match, (state, action: AnyAction) => {
      state.isLoading = false;
			state.error = action.payload;
    })
	}
})