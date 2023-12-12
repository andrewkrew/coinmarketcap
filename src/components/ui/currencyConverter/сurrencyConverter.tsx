import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../shared/hooks/useRedux';
import { coinsSelector } from '../../../redux/selectors';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import styles from './styles.module.css'
import { inputStyle } from '../../../shared/api/styles';

export const CurrencyConverter = () => {
	
	const {coinDetailData} = useAppSelector(coinsSelector);
	const [tokenValue, setTokenValue] = useState<string>('1');
	const [fiatValue, setFiatValue] = useState<string>(coinDetailData.market_data.current_price.usd.toString());

	useEffect(() => {
		setFiatValue((Math.round(+tokenValue * +coinDetailData.market_data.current_price.usd * 100) / 100).toString())
	}, [coinDetailData, tokenValue])

	return (
		<div>
			<h4 className={styles.header}>{coinDetailData.name} to USD Converter</h4>
			<div className={styles.converter}>
				<TextField
					id="tokenConverter" 
					label={coinDetailData.symbol.toUpperCase()} 
					variant="outlined" 
					value={tokenValue}
					type="number"
					fullWidth
					sx={{...inputStyle}}
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
				<SwapHorizIcon sx={{color: '#ff9800'}}/>
				<TextField 
					id="fiatConverter" 
					label="USD $" 
					variant="outlined" 
					value={fiatValue}
					fullWidth
					type="number"
					color='primary'
					sx={{...inputStyle, color:'inherit'}}
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