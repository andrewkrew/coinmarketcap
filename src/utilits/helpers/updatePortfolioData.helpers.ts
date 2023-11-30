import { 
	CoinsAllData, 
	PortfolioData, 
	TokensPortfolioData, 
	TransactionsPortfolioData 
} from "../../shared/api/types";
import { getAverangeCost, 
	getCurrentBalancePortfolio, 
	getPortfolioProfit, 
	getProfitProcent, 
	getTotalCostPortfolio, 
	getTotalToken, 
	getWithdrawProfit 
} from "./calcPortfolioData.helpers";

export const setPortfolioData = (
	tokens: TokensPortfolioData[],
	): PortfolioData => {
	
		if (!tokens.length) return {} as PortfolioData;

		const totalCost = getTotalCostPortfolio(tokens, 'buy');
		const totalSell = getTotalCostPortfolio(tokens, 'sell');
		const currentBalance = getCurrentBalancePortfolio(tokens);
			
		return {
			totalCost,
			totalSell,
			currentBalance,
			profit: getPortfolioProfit(tokens, totalSell, totalCost, currentBalance),
			withdrawProfit: getWithdrawProfit(tokens), // Профит в фиате. будет вычитаться при покупке и прибавляться при продаже
		}		
}

export const getUniqTokensId = (tokens: TransactionsPortfolioData[]) => {
	return tokens.reduce((acc: string[], item) => {
			if (acc.includes(item.tokenId)) {
				return acc;
			}
			return [...acc, item.tokenId]; 
		}, []);
}

export const setPortfolioTokens = (
	currency: CoinsAllData[], 
	transactions: TransactionsPortfolioData[])
	: TokensPortfolioData[]  => {
		
		// if (!transactions.length) return [];

		const uniqIdArray = getUniqTokensId(transactions);

		return uniqIdArray.map(uniqId => {
			
			const currencyData = currency.filter(token => uniqId === token.id)[0];			
			const transactionsData = transactions.filter(token => uniqId === token.tokenId) 
			
			const	totalBuyTokens = getTotalToken(transactionsData, 'buy'); //ok
			const	totalSellTokens = getTotalToken(transactionsData, 'sell'); //ok
			const	averageBuyCost = getAverangeCost(transactionsData, 'buy', totalBuyTokens); //ok
			const	averageSellCost = getAverangeCost(transactionsData, 'sell', totalSellTokens); // ok
			const currentTokens = +(totalBuyTokens + totalSellTokens).toFixed(4); //ok
			const averagePrice = +averageBuyCost.toFixed(4); //ok
			const currentBalance = +(currencyData.current_price * currentTokens).toFixed(2); //ok
			const profit = getProfitProcent(currentBalance, averageBuyCost, totalBuyTokens, totalSellTokens, averageSellCost);
			const profit24h = getProfitProcent(currentBalance, averageBuyCost, totalBuyTokens, totalSellTokens, averageSellCost);

			return ({
				id: uniqId,
				name: currencyData.name,
				symbol: currencyData.symbol,
				totalBuyTokens, //всего куплено токенов
				totalSellTokens, //всего продано токенов
				averageBuyCost, //средний курс покупки
				averageSellCost, //средний курс продажи
				currentTokens, //всего токенов (текущий баланс)
				averagePrice, //средняя цена покупки ???
				currentBalance, //текущий вес актива в портфеле
				currancy: currencyData?.current_price, // текущий курс
				profit,
				profit24h,
				image: currencyData.image,
			})
		}).sort((a, b) => b.currentBalance - a.currentBalance);
}

export const setPortfolioUpdateData = (tokens: string[]): string => {
	return tokens.join('%2C');
}