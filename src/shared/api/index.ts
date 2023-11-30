import axios from "axios";

class Api {
	private readonly BASE_URL: string = 'https://api.coingecko.com/api/v3';
	private readonly API_KEY: string = '&x_cg_demo_api_key=CG-LxtsanKr45RpMiLLJDJgKJed';
	api;
	apiKey;

	constructor() {
		this.api = axios.create({
			baseURL: this.BASE_URL,
		});
		this.apiKey = this.API_KEY;
	}
}

export default Api;