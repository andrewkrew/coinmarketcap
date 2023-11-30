import { createAsyncThunk } from "@reduxjs/toolkit";
import Coins from "../../shared/api/coins";

export const fetchPortfolioCurrencyThunk = createAsyncThunk(
	'coins/fetchPortfolioCurrency',
	async (idList: string, { rejectWithValue }) => {
		try {
			if (!idList) throw new Error ("Error >>> Array with ID's is empty")
			const data = await (new Coins()).getPortfolioUpdateData(idList);
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

export const fetchSelectredTokenThunk = createAsyncThunk(
	'coins/fetchSelectredToken',
	async (id: string, { rejectWithValue }) => {
		try {
			if (!id) throw new Error ("Error >>> Array with ID's is empty")
			const data = await (new Coins()).getPortfolioUpdateData(id);
			
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