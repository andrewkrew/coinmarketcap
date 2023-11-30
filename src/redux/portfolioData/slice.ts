import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PortfolioData, TokensPortfolioData, TransactionsPortfolioData } from "../../shared/api/types";
import dayjs from "dayjs";

interface PortfolioDataList {
	portfolio: PortfolioData,
	tokens: TokensPortfolioData[],
	transactions: TransactionsPortfolioData[],
}

const initialState: PortfolioDataList = {
	portfolio: {
		totalCost: 10, // getTotalCostPortfolio()
		totalSell: 5,
		currentBalance: 2, // getCurrentBalancePortfolio ()
		profit: { //getProfitProcent()
			procent: 3,
			value: 4,
		},
		withdrawProfit: 5, // Профит в фиате. будет вычитаться при покупке и прибавляться при продаже
	},
	tokens: [
		{
			id: 'bitcoin',
			name: 'Bitcoin',
			symbol: 'SHIT1',
			currentTokens: 0.5, //getTotalToken() всего токенов
			totalBuyTokens: 1,
			totalSellTokens: -0.5,
			averageBuyCost : 20000,
			averageSellCost : 40000,
			averagePrice: 20000, //getAveragePriceToken() средняя цена покупки
			currentBalance: 18000, //getCurrentPriceToken() текущая цена актива в портфеле
			currancy: 36000, // текущий курс
			profit: { //getProfitProcent()
				procent: 5,
				value: 30,
			},
			profit24h: {
				procent: 5,
				value: 30,
			},
			image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
		},
		{
			id: 'ethereum',
			name: 'Ethereum',
			symbol: 'SHIT2',
			currentTokens: 10, //getTotalToken()
			totalBuyTokens: 0.5,
			totalSellTokens: 0,
			averageBuyCost : 3000,
			averageSellCost : 0,
			averagePrice: 111, //getAveragePriceToken()
			currentBalance: 500, //getCurrentPriceToken()
			currancy: 200, // текущий курс
			profit: { //getProfitProcent()
				procent: 1,
				value: 370,
			},
			profit24h: {
				procent: 5,
				value: 30,
			},
			image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
			}
	],
	transactions: [
		{
			id: 1,
			tokenId: 'bitcoin',
			type: 'buy',
			price: 20000,
			totalTokens: 1,
			totalCostTransaction: 20000, //
			date: dayjs().toString(),
			comment: 'olololo',
		},
		{
			id: 2,
			tokenId: 'bitcoin',
			type: 'sell',
			price: 40000,
			totalTokens: -0.5,
			totalCostTransaction: -20000, //
			date: dayjs().toString(),
			comment: 'olololo',
		},
		{
			id: 3,
			tokenId: 'ethereum',
			type: 'buy',
			price: 5000,
			totalTokens: 1,
			totalCostTransaction: 5000, //
			date: dayjs().toString(),
			comment: 'olololo',
		}
	],
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