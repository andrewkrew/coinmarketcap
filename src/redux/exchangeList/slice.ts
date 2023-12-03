import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { ExchangeDetailData, ExchangesAllData } from "../../shared/api/types";
import { fetchExchangeDetailsThunk, fetchExchangesThunk } from "./thunk";

interface ExchangesState {
	isLoading: boolean,
	exchangesData: ExchangesAllData[],
	exchangeDetailData: ExchangeDetailData,
	error: string | undefined,
}

const initialState: ExchangesState = {
	isLoading: false,
	exchangesData: [],
	exchangeDetailData: {} as ExchangeDetailData,
	error: '',
}

export const exchangesSlice = createSlice({
	name: 'coins',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addMatcher(fetchExchangesThunk.pending.match, (state) => {
			state.isLoading = true;
		})

		builder.addMatcher(fetchExchangesThunk.fulfilled.match, (state, action: AnyAction) => {
			state.isLoading = false;
			state.exchangesData = action.payload;
			state.error = '';
		})

		builder.addMatcher(fetchExchangesThunk.rejected.match, (state, action: AnyAction) => {
      state.isLoading = false;
			state.error = action.payload;
      }
		);

		builder.addMatcher(fetchExchangeDetailsThunk.pending.match, (state) => {
			state.isLoading = true;
		})

		builder.addMatcher(fetchExchangeDetailsThunk.fulfilled.match, (state, action: AnyAction) => {
			state.isLoading = false;
			state.exchangeDetailData = action.payload;
			state.error = '';
		})

		builder.addMatcher(fetchExchangeDetailsThunk.rejected.match, (state, action: AnyAction) => {
      state.isLoading = false;
			state.error = action.payload;
		})
	}
})