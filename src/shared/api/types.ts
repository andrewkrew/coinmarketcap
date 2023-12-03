export interface CoinsAllData {
	id: string,
	symbol: string,
	name: string,
	image: string,
	current_price: number,
	market_cap: number,
	market_cap_rank: number,
	fully_diluted_valuation: number,
	total_volume: number,
	high_24h: number,
	low_24h: number,
	price_change_24h: number,
	price_change_percentage_24h: number,
	market_cap_change_24h: number,
	market_cap_change_percentage_24h: number,
	circulating_supply: number,
	total_supply: number,
	max_supply: number,
	ath: number,
	ath_change_percentage: number,
	ath_date: string,
	atl: number,
	atl_change_percentage: number,
	atl_date: string,
	roi?: null,
	last_updated: string,
	sparkline_in_7d: {
		price: number[]
	}
}

export interface ExchangesAllData {
	id: string,
	name: string,
	year_established: number,
	country: string,
	description: string,
	url: string,
	image: string,
	has_trading_incentive: boolean,
	trust_score: number,
	trust_score_rank: number,
	trade_volume_24h_btc: number,
	trade_volume_24h_btc_normalized: number,
}

export interface ExchangeDetailData {
	"name": string,
  "year_established": number,
  "country": string,
  "description": string,
  "url": string,
  "image": string,
  "centralized": boolean,
  "trust_score": number,
  "trust_score_rank": number,
  "trade_volume_24h_btc": number,
}

export interface MarketData {
	id: string,
	name: string,
	price: number,
}

export interface CoinDetailData {
  "id": string,
  "symbol": string,
  "name": string,
  "description": {
    en: string,
  },
  "links": {
    "homepage": string [],
    "blockchain_site": string[],
  },
  "image": {
    "thumb": string,
    "small": string,
    "large": string,
  },
  "genesis_date": string,
  "market_cap_rank": number,
	"market_data": {
    "current_price": {
      "usd": number,
		},
		"ath": {
			"usd": number,
		},
		"ath_date": {
			"usd": string,
		},
		"market_cap": {
			"usd": number,
		},
		"total_volume": {
			"usd": number,
		},
		"price_change_24h": number,
		"price_change_percentage_24h": number,
		"total_supply": number,
		"circulating_supply": number,
	},
}

export interface PortfolioData {
	totalCost: number,
	totalSell: number,
	currentBalance: number,
	profit: ProfitData,
	withdrawProfit: number,
}

export interface TokensPortfolioData {
	id: string,
	name: string,
	symbol: string,
	currentTokens: number,
	totalBuyTokens: number,
	totalSellTokens: number,
	averageBuyCost : number,
	averageSellCost : number,
	averagePrice: number,
	currentBalance: number,
	currancy: number,
	profit: ProfitData,
	profit24h: ProfitData,
	image: string,
}

export interface TransactionsPortfolioData {
	id: number,
	tokenId: string,
	type: TypeOfTransaction,
	price: number,
	totalTokens: number,
	totalCostTransaction: number,
	date: string,
	comment?: string,
}

interface ProfitData {
	procent: number,
	value: number,
}

export type TypeOfTransaction = 'buy' | 'sell'

export interface DonutData {
	id: string,
	label: string,
	value: number,
}

export interface TransactionData {
	id: number,
	type: TypeOfTransaction,
	price: number,
	date: string,
	quantity: number,
	totalCostTransaction: number,
	token: {
		id: string,
		name: string,
		symbol: string,
	},
}

export interface TokensAddTransaction {
  id: string;
  name: string;
  symbol: string;
}

export interface searchCoinsData {
	"id": string,
	"name": string,
	"api_symbol": string,
	"symbol": string,
	"market_cap_rank": number,
	"thumb": string,
	"large": string,
}

export interface searchExchangessData {
	"id": string,
	"name": string,
	"market_type": string,
	"thumb": string,
	"large": string,
}

export interface searchData {
	coins: searchCoinsData[],
	exchanges: searchExchangessData[],
}