import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { CoinsAllData, CoinDetailData, MarketData } from "../../shared/api/types";
import { fetchCoinsThunk, fetchCoinDetailsThunk, fetchCandleDataThunk, fetchMarketDataThunk } from "./thunk";

interface CoinsState {
	isLoading: boolean,
	coinsData: CoinsAllData[],
	coinDetailData: CoinDetailData,
	coinCandleData: number[],
	marketData: MarketData[],
	error: string | undefined,
}

const initialState: CoinsState = {
	isLoading: false,
	coinsData: [],
	coinDetailData: {} as CoinDetailData,
	coinCandleData: [],
	marketData: [],
	error: '',
}

export const coinsSlice = createSlice({
	name: 'coins',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addMatcher(fetchCoinsThunk.pending.match, (state) => {
			state.isLoading = true;
		})

		builder.addMatcher(fetchCoinsThunk.fulfilled.match, (state, action: AnyAction) => {
			state.isLoading = false;
			state.coinsData = action.payload;
			state.error = '';
		})

		builder.addMatcher(fetchCoinsThunk.rejected.match, (state, action: AnyAction) => {
      state.isLoading = false;
			state.error = action.payload;
      }
		);

		builder.addMatcher(fetchCoinDetailsThunk.pending.match, (state) => {
			state.isLoading = true;
		})

		builder.addMatcher(fetchCoinDetailsThunk.fulfilled.match, (state, action: AnyAction) => {
			state.isLoading = false;
			state.coinDetailData = action.payload;
			state.error = '';
		})

		builder.addMatcher(fetchCoinDetailsThunk.rejected.match, (state, action: AnyAction) => {
      state.isLoading = false;
			state.error = action.payload;
		})

		builder.addMatcher(fetchCandleDataThunk.pending.match, (state) => {
			state.isLoading = true;
		})

		builder.addMatcher(fetchCandleDataThunk.fulfilled.match, (state, action: AnyAction) => {
			state.isLoading = false;
			state.coinCandleData = action.payload;
			state.error = '';
		})

		builder.addMatcher(fetchCandleDataThunk.rejected.match, (state, action: AnyAction) => {
      state.isLoading = false;
			state.error = action.payload;
		})

		builder.addMatcher(fetchMarketDataThunk.pending.match, (state) => {
			state.isLoading = true;
		})

		builder.addMatcher(fetchMarketDataThunk.fulfilled.match, (state, action: AnyAction) => {
			state.isLoading = false;
			state.marketData = action.payload;
			state.error = '';
		})

		builder.addMatcher(fetchMarketDataThunk.rejected.match, (state, action: AnyAction) => {
      state.isLoading = false;
			state.error = action.payload;
		})
	}
})