import { portfolioDataSlice } from "./slice";
export const { 
	updatePortfolioData,
	updateTokens,
	updateTransactions,
	addTransaction, 
	removeTransaction,
	removeAllTransactions,
	clearPortfolioState,
} = portfolioDataSlice.actions;
export const portfolioDataReducer = portfolioDataSlice.reducer;