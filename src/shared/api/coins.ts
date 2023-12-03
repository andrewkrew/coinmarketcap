import Api from ".";
import { CoinsAllData, CoinDetailData,  MarketData } from "./types";

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