import { TransactionTabs } from "../ui/transactionTabs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AutocompleteTokens } from '../ui/autocompleteTokens';
import { Box, TextField } from '@mui/material';
import { FormEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import { TokensAddTransaction} from "../../shared/api/types";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/useRedux";
import { portfolioCurrancySelector, portfolioDataSelector } from "../../redux/selectors";
import { fetchSelectredTokenThunk } from "../../redux/portfolioCurrency";
import { addTransaction } from "../../redux/portfolioData";
import { getMaxId} from "../../utilits";
import styles from './styles.module.css'
import { inputStyle } from "../../shared/api/styles";
import { MainBtn } from "../ui/mainBtn";
import { showMessage } from "../../redux";

export const AddTransactionMenu = () => {

	const [operation, setOperation] = useState<number>(0);
	const [token, setToken] = useState<TokensAddTransaction>({} as TokensAddTransaction);
	const [currencyToken, setCurrencyToken] = useState<string>('0');
	const [quantity, setQuantity] = useState<string>('1');
	const [date, setDate] = useState<dayjs.Dayjs>(dayjs());

	const {selectedToken} = useAppSelector(portfolioCurrancySelector);
	const {transactions, tokens} = useAppSelector(portfolioDataSelector)
	const dispatch = useAppDispatch();

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!Object.keys(token).length || !currencyToken || +quantity === 0 || !date) return;
		
		dispatch(addTransaction({
			id: getMaxId(transactions),
			tokenId: token.id,
			type: operation === 0 ? 'buy' : 'sell',
			price: +currencyToken,
			totalTokens: +operation === 0 ? +quantity : +(-quantity),
			totalCostTransaction: +operation === 0 ? +currencyToken * +quantity : +(-currencyToken) * +quantity,
			date: date.toString(),
			symbol: token.symbol,
		}));
		setOperation(0);
		setCurrencyToken('0');
		setQuantity('1');
		setDate(dayjs());
		dispatch(showMessage('Transaction added successfully!'))
	}

	useEffect(() => {
		if (!quantity) return;
		if (operation === 1) {
			const selectedToken = tokens.find(item => item.id === token.id);
			if (selectedToken && +quantity > selectedToken.currentTokens) {
				setQuantity(selectedToken.currentTokens.toString());
			}
		}
	}, [operation, quantity, token.id, tokens])

	useEffect(() => {
		dispatch(fetchSelectredTokenThunk(token.id));
	}, [token, dispatch])

	useEffect(() => {
		if(Object.keys(token).length) {
			setCurrencyToken(selectedToken[0].current_price?.toString())
		} else {
			setCurrencyToken('0')
		}
	}, [selectedToken])

	const checkQuantityTokens = (event: React.ChangeEvent<HTMLInputElement>) => {
		const quantity = event.target.value;

		if (+quantity < 0) return setQuantity('0');
		if (operation === 1) {
			const selectedToken = tokens.find(item => item.id === token.id);
			
			if (selectedToken) {
				return +quantity > selectedToken.currentTokens
					? setQuantity(selectedToken.currentTokens?.toString()) 
					: setQuantity(quantity?.toString());
			}
		}
		setQuantity(quantity?.toString());
	}
	
	return (
		<> 
			<h3 className={styles.title}>Add transaction</h3>
			<form className={styles.container} action="" method="post" onSubmit={onSubmit}>            
				<TransactionTabs 
					operation={operation} 
					setOperation={setOperation}
				/>           
				<AutocompleteTokens 
					setToken = {setToken} 
					operation = {operation}
				/>
				<TextField
					id="quantityToken" 
					label="Quantity" 
					variant="outlined" 
					value={quantity}
					type="number"
					required
					sx={{...inputStyle, width: '80%'}}
					onChange={checkQuantityTokens}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField 
					id="priceToken" 
					label="Price" 
					variant="outlined" 
					value={currencyToken}
					type="number"
					required
					sx={{...inputStyle, width: '80%'}}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						const currency = event.target.value;
						+currency < 0 ? setCurrencyToken('0') : setCurrencyToken(currency);
					}}
					InputLabelProps={{
						shrink: true,
					}}
				/> 
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker 
						defaultValue={dayjs()}
						value={date}
						sx={{...inputStyle, width: '80%'}}
						onAccept={(value) => {
							if (!value) return;
							setDate(value);
						}}
					/>
				</LocalizationProvider>
				<div>Total spent: {quantity ? (+quantity * +currencyToken)?.toFixed(2) : ''}</div>
				<Box onClick={() => onSubmit}>
					<MainBtn>Add transaction</MainBtn>
				</Box>
			</form>
		</>
	)
}