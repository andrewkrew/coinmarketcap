import { createAsyncThunk } from "@reduxjs/toolkit";
import Coins from "../../shared/api/coins";


export const fetchCoinsThunk = createAsyncThunk(
	'coins/fetchCoins',
	async ({per_page, page}: {per_page:number, page: number}, { rejectWithValue }) => {
		try {
			const data = await (new Coins()).getAll({per_page, page});
			return data;
		}
		catch(error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
      return rejectWithValue('Server error, try again!');
		}
	}
)

export const fetchCoinDetailsThunk = createAsyncThunk(
	'coins/fetchCoinDetails',
	async (id: string, { rejectWithValue }) => {
		try {
			const data = await (new Coins()).getDetails(id);
			return data
		}
		catch(error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
      return rejectWithValue('Server error, try again!');
		}
	}
)

export const fetchCandleDataThunk = createAsyncThunk(
	'coins/fetchCandleData',
	async ({id, days} : {id: string, days: string}, { rejectWithValue }) => {
		try {
			const data = await (new Coins()).getCandleData({id, days});
			return data
		}
		catch(error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
      return rejectWithValue('Server error, try again!');
		}
	}
)

export const fetchMarketDataThunk = createAsyncThunk(
	'coins/fetchMarketData',
	async (_, { rejectWithValue }) => {
		try {
			const data = await (new Coins()).getCoinsCurrancy();
			return data
		}
		catch(error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
      return rejectWithValue('Server error, try again!');
		}
	}
)