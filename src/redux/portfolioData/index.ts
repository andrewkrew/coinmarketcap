import { portfolioDataSlice } from "./slice";
export const { 
	updatePortfolioData,
	updateTokens,
	updateTransactions,
	addTransaction, 
	removeTransaction,
	removeAllTransactions,
} = portfolioDataSlice.actions;
export const portfolioDataReducer = portfolioDataSlice.reducer;