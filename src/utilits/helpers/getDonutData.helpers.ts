import { DonutData, TokensPortfolioData } from "../../shared/api/types";

export const getDataDonut = (tokens: TokensPortfolioData[]): DonutData[] => {
	const data = [...tokens];
	const sortedData = data.sort((a, b) => b.currentBalance - a.currentBalance);

	const procentData = sortedData.map(item => {
		return {
			...item,
			procent: +getProcentPortfolio(tokens, item.id)
		}
	})
		
	return getDonutObjects(procentData);
}

const getDonutObjects = (tokens: TokensPortfolioData[]): DonutData[] => {
	
	if (tokens.length > 5) {
		const result = addOtherValue(tokens);
		return result.map(item => {
			return ({
				id: item.id,
				label: `${item.name} - ${item.procent} %`,
				value: +item.currentBalance?.toFixed(2),
			})
		})
	}
	
	return tokens.map(item => {
		return ({
			id: item.id,
			label: `${item.name} - ${item.procent} %`,
			value: +item.currentBalance?.toFixed(2),
		})
	})
}

const addOtherValue = (tokens: TokensPortfolioData[]) => {
	
	const slicedData = tokens.slice(0, 5);

	const currentBalance = tokens.reduce((acc, item) => {
		return acc = acc + item.currentBalance;
	}, 0);

	const currentBalanceSliced = slicedData.reduce((acc, item) => {
		return acc = acc + item.currentBalance;
	}, 0);


	return (
		[...slicedData,
			{
				id: 'other',
				name: 'Other',
				procent: ((currentBalance - currentBalanceSliced)  * 100 / (currentBalance)).toFixed(1),
				currentBalance: currentBalance - currentBalanceSliced,
			}
		]
	)
}



const getProcentPortfolio = (tokens: TokensPortfolioData[], tokenId: string) => {
	const result = tokens.reduce((acc, item) => {
		if (item.id === tokenId) {
			return {
				itemSum: acc.itemSum + item.currentBalance,
				totalSum: acc.totalSum + item.currentBalance, 
			}
		} else {
			return {
				...acc, 
				totalSum: acc.totalSum + item.currentBalance,
			}
		}
	}, {
		totalSum: 0,
		itemSum: 0,
	});

	return (result.itemSum * 100 / result.totalSum).toFixed(1);	
}