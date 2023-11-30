import { MarketData, TokensAddTransaction, TokensPortfolioData, TransactionsPortfolioData } from "../../shared/api/types";

export const getMaxId = (array: TransactionsPortfolioData[]) => {
	return array.reduce((res, item) => {
			return res = Math.max(res, item.id)
		}, 0) + 1
}

export const getIdList = (tokens: TokensPortfolioData[], fetchData: MarketData[]) => {
	const result = tokens.map(item => {
		const findValue = fetchData.findIndex((data: MarketData) => item.id === data.id);
		if(findValue !== -1) {
			return ({
				id: item.id,
				name: item.name,
				symbol: item.symbol,
			} as TokensAddTransaction)
		}
		else {
			return ({
				id: 'error',
				name: 'error',
				symbol: 'ERROR',
			})
		}
	})
	return result;
}