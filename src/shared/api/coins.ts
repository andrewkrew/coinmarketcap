import Api from ".";
import { CoinsAllData, CoinDetailData,  MarketData } from "./types";

// 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=true&locale=en&per_page=100&page=1&x_cg_demo_api_key=CG-LxtsanKr45RpMiLLJDJgKJed'

// `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false&x_cg_demo_api_key=CG-LxtsanKr45RpMiLLJDJgKJed`

// `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=max&x_cg_demo_api_key=CG-LxtsanKr45RpMiLLJDJgKJed`

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Ctron&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en

class Coins extends Api {
	private readonly endpointCoins = '/coins';
	private readonly endpointAll = '/markets?vs_currency=usd&order=market_cap_desc&sparkline=false&locale=en';

	async getAll({per_page, page}: {per_page: number, page: number}):Promise<CoinsAllData[]> {
		const {data} = await this.api.get<CoinsAllData[]>
			(`${this.endpointCoins}${this.endpointAll}&per_page=${per_page}&page=${page}${this.apiKey}`);
		return data;
	}

	async getDetails(id: string):Promise<CoinDetailData> {
		const {data} = await this.api.get<CoinDetailData>
			(`${this.endpointCoins}/${id}?localization=false&tickers=false&market_
			data=true&community_data=false&developer_data=false&sparkline=false${this.apiKey}`);
		return data;
	}

	async getCandleData({id, days} : {id: string, days: string}):Promise<number[]> {
		const {data} = await this.api.get<number[]>
			(`${this.endpointCoins}/${id}/ohlc?vs_currency=usd&days=${days}${this.apiKey}`);
		return data;
	}

	async getCoinsCurrancy():Promise<MarketData> {
		const {data} = await this.api.get<MarketData>
			(`${this.endpointCoins}/list?include_platform=false${this.apiKey}`);
		return data;
	}

	async getPortfolioUpdateData(idList: string):Promise<CoinsAllData[]> {
		const {data} = await this.api.get<CoinsAllData[]>
			(`${this.endpointCoins}${this.endpointAll}&ids=${idList}${this.apiKey}`);
		return data;
	}
}

export default Coins;