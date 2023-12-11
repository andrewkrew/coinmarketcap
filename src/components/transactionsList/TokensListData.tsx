import { Box } from "@mui/material"
import { TokensPortfolioData } from "../../shared/api/types"
import { AddTransactionMenu } from "../addTransactionMenu"
import { PriceIndicator } from "../priceIndicator"
import { ModalWindow } from "../ui/modalWindow"
import styles from './styles.module.css'
import { TransactionsMenu } from "../transactionsMenu"
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const TokensListData = (item: TokensPortfolioData) => {
	
	const navigate = useNavigate();
	const navigateToCoin = (coinId: string) => {
		navigate(`/currencies/${coinId}`);
	}
	const [tokenTransInfoId, setTokenTransInfoId] = useState<string>('');

	return <>
		<div className={styles.coinName} onClick={() => navigateToCoin(item.id)}>
			<img className={styles.coinLogo} src={item.image} alt={item.name} />
			<p className={styles.coinTitle}>{item.name}</p>
			<p className={styles.coinSymbol}>{(item.symbol).toUpperCase()}</p>
		</div>
		<p className={styles.coinPrice}>{item.currancy}</p>
		<div className={styles.coin24H}>
			<PriceIndicator>{item.profit24h.procent}</PriceIndicator>
		</div>
		<div className={styles.coinHold}>
			<p>${item.currentBalance}</p>
			<p>{item.currentTokens} {item.symbol.toUpperCase()}</p>
		</div>
		<p className={styles.coinAvgPrice}>{item.averagePrice}</p>
		<div className={styles.coinProfit}>
			<p>$ {item.profit.value}</p>
			<PriceIndicator>{item.profit.procent}</PriceIndicator>
		</div>
		<div className={styles.coin__icons}>
			<Box sx={{
				'& .MuiButtonBase-root' : {
					padding: '5px',
					minWidth: 0,
				}
			}}>
				<ModalWindow btnValue={<AddIcon/> } type="add">
					<AddTransactionMenu/>
				</ModalWindow>
			</Box>
			<Box 
				onClick={() => setTokenTransInfoId(item.id)}
				sx={{
				'& .MuiButtonBase-root' : {
					padding: '5px',
					minWidth: 0,
				}
			}}>
				<ModalWindow btnValue={<InfoIcon/>} type="info">
					<TransactionsMenu tokenTransInfoId={tokenTransInfoId}/>
				</ModalWindow>						
			</Box>					
		</div>
	</>
}