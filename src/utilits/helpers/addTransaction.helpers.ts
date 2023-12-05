import { 
	CoinsAllData,
	ExchangesAllData,
	MarketData, 
	// TokensAddTransaction, 
	TokensPortfolioData, 
	TransactionsPortfolioData,
	searchCoinsData,
	searchExchangessData,
} from "../../shared/api/types";

export const getMaxId = (array: TransactionsPortfolioData[]) => {
	return array.reduce((res, item) => {
			return res = Math.max(res, item.id)
		}, 0) + 1
}

export const getIdList = (tokens: TokensPortfolioData[], fetchData: MarketData[]):searchCoinsData[] => {	
	const result = tokens.map(item => {
		const findValue = fetchData.findIndex((data: MarketData) => item.id === data.id);
		if (findValue !== -1) {
			return ({
				id: item.id,
				name: item.name,
				symbol: item.symbol.toUpperCase(),
				thumb: item.image,
				api_symbol: item.symbol.toUpperCase(),
				market_cap_rank: 1,
				large: item.image,
			} as searchCoinsData)
		} else {
			// return {
			// 	id: '',
			// 	name: '',
			// 	symbol: '',
			// 	thumb: '',
			// 	api_symbol: '',
			// 	large: '',
			// 	market_cap_rank: 1,
			// } as searchCoinsData;
			return {} as searchCoinsData
		}
	})
	return result;
}

export const changeAutocompleteDataType = (data: CoinsAllData[]): searchCoinsData[] => {
	return data.map(item => {
		return {
			id: item.id,
			name: item.name,
			symbol: item.symbol.toUpperCase(),
			thumb: item.image,
			api_symbol: item.symbol.toUpperCase(),
			market_cap_rank: item.market_cap_rank,
			large: item.image,
		} as searchCoinsData
	})
}

export const changeAutocompleteExcgDataType = (data: ExchangesAllData[]): searchExchangessData[] => {
	return data.map(item => {
		return {
			id: item.id,
			name: item.name,
			thumb: item.image,
		} as searchExchangessData;
	})
}