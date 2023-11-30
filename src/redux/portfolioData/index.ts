import { portfolioDataSlice } from "./slice";
export const { 
	updatePortfolioData,
	updateTokens,
	addTransaction, 
	removeTransaction,
	removeAllTransactions,
} = portfolioDataSlice.actions;
export const portfolioDataReducer = portfolioDataSlice.reducer;