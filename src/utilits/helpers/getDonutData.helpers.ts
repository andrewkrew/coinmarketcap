import { DonutData, TokensPortfolioData } from "../../shared/api/types";

export const getDataDonut = (tokens: TokensPortfolioData[]): DonutData[] => {
	const data = [...tokens];
	const sortedData = data.sort((a, b) => b.currentBalance - a.currentBalance)
	
	if (sortedData.length > 5) {
		const result = getDonutObjects(sortedData.slice(0, 5))
		return addOtherValue(result, tokens);
	}

	return getDonutObjects(sortedData);
}

const getDonutObjects = (tokens: TokensPortfolioData[]): DonutData[] => {
	return tokens.map(item => {
		return ({
			id: item.id,
			label: item.name,
			value: +item.currentBalance.toFixed(2),
		})
	})
}

const addOtherValue = (sortedData: DonutData[], tokens: TokensPortfolioData[]) => {
	
	const currentBalance = tokens.reduce((acc, item) => {
		return acc = acc + item.currentBalance;
	}, 0);

	const currentBalanceSorted = sortedData.reduce((acc, item) => {
		return acc = acc + item.value;
	}, 0);

	return (
		[...sortedData,
			{
				id: 'other',
				label: 'Other',
				value: +(currentBalance - currentBalanceSorted).toFixed(2),
			}
		]
	)
}