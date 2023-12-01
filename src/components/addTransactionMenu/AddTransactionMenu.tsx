import { TransactionTabs } from "../ui/transactionTabs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AutocompleteTokens } from '../ui/autocompleteTokens';
import { Button, TextField } from '@mui/material';
import { FormEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import { TokensAddTransaction} from "../../shared/api/types";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/useRedux";
import { portfolioCurrancySelector, portfolioDataSelector } from "../../redux/selectors";
import { fetchSelectredTokenThunk } from "../../redux/portfolioCurrency";
import { addTransaction } from "../../redux/portfolioData";
import { getMaxId} from "../../utilits";
// import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
// import { Nullable } from "primereact/ts-helpers";


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
		if (!token || !currencyToken || !quantity || !date) return;
		dispatch(addTransaction({
			id: getMaxId(transactions),
			tokenId: token.id,
			type: operation === 0 ? 'buy' : 'sell',
			price: +currencyToken,
			totalTokens: +operation === 0 ? +quantity : +(-quantity),
			totalCostTransaction: +operation === 0 ? +currencyToken * +quantity : +(-currencyToken) * +quantity,
			date: date.toString(),
		}));
		setOperation(0);
		setCurrencyToken('0');
		setQuantity('1');
		setDate(dayjs());
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
			setCurrencyToken(selectedToken[0].current_price.toString())
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
					? setQuantity(selectedToken.currentTokens.toString()) 
					: setQuantity(quantity.toString());
			}
		}
		setQuantity(quantity.toString());
	}
	
	return (
			<div> 
				<h3>Add transaction</h3>
				<form action="" method="post" onSubmit={onSubmit}>            
					<TransactionTabs 
						operation={operation} 
						setOperation={setOperation}
					/>           
					<AutocompleteTokens 
						setToken = {setToken} 
						operation = {operation}
					/>
					<div>
						{/* <div className="flex-auto">
							<label htmlFor="minmaxfraction" className="font-bold block mb-2">Quantity</label>
							<InputNumber 
								inputId="minmaxfraction" 
								value={quantity} 
								onValueChange={(e: InputNumberValueChangeEvent) => setQuantity(e.value)} 
								// suffix={`  ${token.id.toUpperCase()}`}
								// suffix={' ' + `${token?.id?.toUpperCase() && " "}`}
								suffix={token?.id ? `  ${token?.id?.toUpperCase()}` : " "}
								showButtons
								min={0}
								minFractionDigits={2} 
								maxFractionDigits={8}
							/>
            </div>
						<div className="flex-auto">
							<label htmlFor="stacked-buttons" className="font-bold block mb-2">United States</label>
							<InputNumber 
								inputId="stacked-buttons" 
								value={currencyToken} 
								onValueChange={(e: InputNumberValueChangeEvent) => setCurrencyToken(e.value)} 
								showButtons 
								mode="currency" 
								currency="USD"
								min={0}
								maxFractionDigits={8}
							/>
            </div> */}
						<TextField
							id="quantityToken" 
							label="Quantity" 
							variant="outlined" 
							value={quantity}
							type="number"
							required
							onChange={checkQuantityTokens}
							// onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuantity(+event.target.value)}
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
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const currency = event.target.value;
								+currency < 0 ? setCurrencyToken('0') : setCurrencyToken(currency);
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/> 
					</div> 
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker 
							defaultValue={dayjs()}
							value={date}
							onAccept={(value) => {
								if (!value) return;
								setDate(value);
							}}
						/>
					</LocalizationProvider>
					<div>Total spent: {quantity ? +quantity * +currencyToken : ''}</div>
					<Button variant="outlined" type="submit">Add transaction</Button>
				</form>
			</div>
	)
}