import { createAsyncThunk } from "@reduxjs/toolkit";
import Excahnges from "../../shared/api/exchanges";

export const fetchExchangesThunk = createAsyncThunk(
	'coins/fetchExchanges',
	async ({per_page, page}: {per_page:number, page: number}, { rejectWithValue }) => {
		try {
			const data = await (new Excahnges()).getExchangeAll({per_page, page});
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

export const fetchExchangeDetailsThunk = createAsyncThunk(
	'coins/fetchExchangeDetails',
	async (id: string, { rejectWithValue }) => {
		try {
			const data = await (new Excahnges()).getExchangeDetail(id);			
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