import { createAsyncThunk } from "@reduxjs/toolkit";
import Coins from "../../shared/api/coins";

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