import { TokensPortfolioData, TransactionsPortfolioData, TypeOfTransaction } from "../../shared/api/types";

export const getTotalToken = (transactions: TransactionsPortfolioData[], type: TypeOfTransaction): number=> {
	
	if (type === 'buy') {
		const buyTransactions = transactions.filter(item => item.type === 'buy')
			.reduce((sum, item) => {
				return sum = sum + item.totalTokens;
			}, 0)
		return buyTransactions ? buyTransactions : 0
	}

	else {
		const sellTransactions = transactions.filter(item => item.type === 'sell')
			.reduce((sum, item) => {
				return sum = sum + item.totalTokens;
			}, 0)
		return sellTransactions ? sellTransactions : 0
	}
}

export const getAverangeCost = (
	transactions: TransactionsPortfolioData[], 
	type: TypeOfTransaction,
	totalTokens: number | null,
	): number => {
	
	if (totalTokens === 0) return 0;

	if (type === 'buy') {
		const sumData = transactions.filter(item => item.type === 'buy')
			.reduce((sum, item) => {
				return sum = {
					countToken: sum.countToken + item.totalTokens,
					AvgCost: (sum.AvgCost + item.price * item.totalTokens),
				}
			}, {countToken: 0, AvgCost: 0});
		
		return sumData.AvgCost / sumData.countToken;
	} 

	else {
		const sumData = transactions.filter(item => item.type === 'sell')
			.reduce((sum, item) => {
				return sum = {
					countToken: sum.countToken + item.totalTokens,
					AvgCost: (sum.AvgCost + item.price * item.totalTokens),
				}
			}, {countToken: 0, AvgCost: 0});
		
		return sumData.AvgCost / sumData.countToken;
	}
}

export const getProfitProcent = (
	currentBalance: number, 
	averageBuyCost: number,
	totalBuyTokens: number,
	totalSellTokens: number,
	averageSellCost: number,
	): {procent: number, value: number} => {

		const value = currentBalance - totalSellTokens * averageSellCost - totalBuyTokens * averageBuyCost;
		return {
			procent: +((value - totalSellTokens * averageSellCost) * 100 / (totalBuyTokens * averageBuyCost)).toFixed(2),
			value: +value.toFixed(2),
		}
}

export const getTotalCostPortfolio = (tokens: TokensPortfolioData[], type: TypeOfTransaction) => {
	
	if (type === 'buy') {
		return tokens.reduce((sum, item) => {
			return sum = sum + item.averageBuyCost * item.totalBuyTokens;
		}, 0)
	}
	else {
	return tokens.reduce((sum, item) => {
		return sum = sum + item.averageSellCost * item.totalSellTokens;
	}, 0)
	}
}

export const getCurrentBalancePortfolio = (tokens: TokensPortfolioData[]) => {
	return tokens.reduce((sum, item) => {
		return sum = sum + item.currentBalance;
	}, 0)
}

export const getPortfolioProfit = (
	tokens: TokensPortfolioData[], 
	totalSell: number,
	totalCost: number,
	currentBalance: number,
	) => {
	const value = tokens.reduce((sum, item) => {
		return sum = sum + item.profit.value;
	}, 0)
	return({
		value: +value.toFixed(2),
		procent: +((currentBalance - totalSell) * 100 / totalCost - 100).toFixed(2),
	}) 
}

export const getWithdrawProfit = (tokens: TokensPortfolioData[]) => {
	return tokens.reduce((sum, item) => {
		return sum = sum + item.averageSellCost * item.totalSellTokens
	}, 0)
}


export const findBestInvest = (tokens: TokensPortfolioData[]) => {
	const data = [...tokens];
	return data.sort((a, b) => b.profit.value - a.profit.value)[0];
}

export const findWhorstInvest = (tokens: TokensPortfolioData[]) => {
	const data = [...tokens];
	return data.sort((a, b) => a.profit.value - b.profit.value)[0];
}