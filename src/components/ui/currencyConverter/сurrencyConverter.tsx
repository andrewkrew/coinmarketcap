import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../shared/hooks/useRedux';
import { coinsSelector } from '../../../redux/selectors';

export const CurrencyConverter = () => {
	
	const {coinDetailData} = useAppSelector(coinsSelector);
	const [tokenValue, setTokenValue] = useState<string>('1');
	const [fiatValue, setFiatValue] = useState<string>(coinDetailData.market_data.current_price.usd.toString());

	useEffect(() => {
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
						const newValue = event.target.value;
						if (+newValue < 0) {
							setFiatValue('0');
							setTokenValue('0')
							return
						} 
						setTokenValue((newValue).toString());
						setFiatValue((+newValue * coinDetailData.market_data.current_price.usd).toString());
					}}
					InputLabelProps={{
						shrink: true,
					}}
					onBlur={() => {
						setFiatValue((+fiatValue).toString())
						setTokenValue((+tokenValue).toString())
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
						setFiatValue(newValue.toString());
						setTokenValue((+newValue / coinDetailData.market_data.current_price.usd).toString());
					}}
					InputLabelProps={{
						shrink: true,
					}}
					onBlur={() => {
						setFiatValue((+fiatValue).toString())
						setTokenValue((+tokenValue).toString())
					}}
				/> 
			</div>
		</div>
	)
}