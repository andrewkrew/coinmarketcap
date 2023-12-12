import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PortfolioData, TokensPortfolioData, TransactionsPortfolioData } from "../../shared/api/types";

interface PortfolioDataList {
	portfolio: PortfolioData,
	tokens: TokensPortfolioData[],
	transactions: TransactionsPortfolioData[],
}

const initialState: PortfolioDataList = {
	portfolio: {} as PortfolioData,
	tokens: [],
	transactions: [],
}

export const portfolioDataSlice = createSlice({
	name: 'portfolioData',
	initialState,
	reducers: {
		updatePortfolioData: (state, action: PayloadAction<PortfolioData>) => {
			state.portfolio = action.payload;
		},
		updateTokens: (state, action: PayloadAction<TokensPortfolioData[]>) => {
			state.tokens = action.payload;
		},
		updateTransactions: (state, action: PayloadAction<TransactionsPortfolioData[]>) => {
			state.transactions = action.payload;
		},
		addTransaction: (state, action: PayloadAction<TransactionsPortfolioData>) => {
			state.transactions = [...state.transactions, action.payload];
		},
		removeTransaction: (state, action: PayloadAction<number>) => {
			state.transactions = state.transactions.filter(item => item.id !== action.payload);
		},
		removeAllTransactions: (state, action: PayloadAction<string>) => {
			state.transactions = state.transactions.filter(item => item.tokenId !== action.payload);
		}
	}
})