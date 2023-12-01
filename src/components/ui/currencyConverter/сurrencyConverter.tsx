import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../shared/hooks/useRedux';
import { coinsSelector } from '../../../redux/selectors';

export const CurrencyConverter = () => {
	
	const {coinDetailData} = useAppSelector(coinsSelector);
	const [tokenValue, setTokenValue] = useState<string>('1');
	const [fiatValue, setFiatValue] = useState<string>(coinDetailData.market_data.current_price.usd.toString());

	useEffect(() => {
		// setFiatValue((+tokenValue * +coinDetailData.market_data.current_price.usd).toFixed(2))
		setFiatValue((+tokenValue * +coinDetailData.market_data.current_price.usd).toString())
	}, [coinDetailData, tokenValue])

	
	return (
		<div>
			<p>{coinDetailData.name} to USD Converter</p>
			<div>
				<TextField
					id="tokenConverter" 
					label={coinDetailData.symbol.toUpperCase()} 
					variant="outlined" 
					value={tokenValue}
					type="number"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						// const newValue = Math.max(+event.target.value, 0);
						const newValue = event.target.value;
						if (+newValue < 0) {
							setFiatValue('0');
							setTokenValue('0')
							return
						} 
						// setTokenValue(newValue.toFixed(7));
						// setFiatValue((newValue * coinDetailData.market_data.current_price.usd).toFixed(2));
						setTokenValue((+newValue).toString());
						setFiatValue((+newValue * coinDetailData.market_data.current_price.usd).toString());
					}}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField 
					id="fiatConverter" 
					label="USD $" 
					variant="outlined" 
					value={fiatValue}
					type="number"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						const newValue = event.target.value;
						if (+newValue < 0) {
							setFiatValue('0');
							setTokenValue('0')
							return
						} 
						// setFiatValue(newValue.toFixed(2));
						// setTokenValue((newValue / coinDetailData.market_data.current_price.usd).toFixed(7));
						// setFiatValue((+(+newValue).toFixed(2)).toString());
						setFiatValue((+newValue).toString());
						setTokenValue((+newValue / coinDetailData.market_data.current_price.usd).toString());
					}}
					InputLabelProps={{
						shrink: true,
					}}
				/> 
			</div>
		</div>
	)
}