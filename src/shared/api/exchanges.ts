import Api from ".";
import { ExchangeDetailData, ExchangesAllData } from "./types";

class Excahnges extends Api {
	private readonly endpointExchanges = '/exchanges';

	async getExchangeAll({per_page, page}: {per_page: number, page: number}):Promise<ExchangesAllData[]> {
		const {data} = await this.api.get<ExchangesAllData[]>
			(`${this.endpointExchanges}?per_page=${per_page}&page=${page}${this.apiKey}`);
		return data;
	}

		async getExchangeDetail(id: string):Promise<ExchangeDetailData[]> {
		const {data} = await this.api.get<ExchangeDetailData[]>
			// (`${this.endpointExchanges}/${id}${this.apiKey}`);
			(`${this.endpointExchanges}/${id}`);
		return data;
	}
}

export default Excahnges;