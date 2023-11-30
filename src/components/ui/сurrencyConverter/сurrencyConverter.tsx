import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../shared/hooks/useRedux';
import { coinsSelector } from '../../../redux/selectors';

export const CurrencyConverter = () => {
	
	const {coinDetailData} = useAppSelector(coinsSelector);
	const [tokenValue, setTokenValue] = useState(1);
	const [fiatValue, setFiatValue] = useState(coinDetailData.market_data.current_price.usd);

	useEffect(() => {
		setFiatValue(+(tokenValue * coinDetailData.market_data.current_price.usd).toFixed(2))
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
								const newValue = Math.max(+event.target.value, 0);
								setTokenValue(+newValue.toFixed(7));
								setFiatValue(+(newValue * coinDetailData.market_data.current_price.usd).toFixed(2));
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
								const newValue = Math.max(+event.target.value, 0);
								setFiatValue(+newValue.toFixed(2));
								setTokenValue(+(newValue / coinDetailData.market_data.current_price.usd).toFixed(7));
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/> 
			</div>
		</div>
	)
}