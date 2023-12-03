import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { fetchCandleDataThunk} from "./thunk";

interface CoinsState {
	isLoading: boolean,
	coinCandleData: number[],
	error: string | undefined,
}

const initialState: CoinsState = {
	isLoading: false,
	coinCandleData: [],
	error: '',
}

export const candleSlice = createSlice({
	name: 'coins',
	initialState,
	reducers: {},
	extraReducers(builder) {
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
	}
})