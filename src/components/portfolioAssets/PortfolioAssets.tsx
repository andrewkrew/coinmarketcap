import { useState } from 'react';
import { portfolioDataSelector } from '../../redux/selectors';
import { useAppSelector } from '../../shared/hooks/useRedux';
import styles from './styles.module.css'
import AddIcon from '@mui/icons-material/Add';	
import { useNavigate } from 'react-router-dom';
import { PriceIndicator } from '../priceIndicator';
import { ModalWindow } from '../ui/modalWindow';
import { AddTransactionMenu } from '../addTransactionMenu';
import { TransactionsMenu } from '../transactionsMenu';

export const PortfolioAssets = () => {
	const {tokens} = useAppSelector(portfolioDataSelector);
	const navigate = useNavigate();
	const navigateToCoin = (coinId: string) => {
		navigate(`/currencies/${coinId}`);
	}
	const [tokenTransInfoId, setTokenTransInfoId] = useState<string>('');


	return (
		<section className={styles.coins}>
			<div className={styles.container}>
				<p className={styles.coinName}>Name</p>
				<p className={styles.coinPrice}>Price, $</p>
				<p className={styles.coin24H}>24h%</p>
				<p className={styles.coinHold}>Holdings</p>
				<p className={styles.coinAvgPrice}>Avg. Buy Price</p>
				<p className={styles.coinProfit}>Profit/Loss</p>
				<p className={styles.coinAdd}>Add</p>
			</div>
			{tokens.map((item) => {
				return( 
					<div className={styles.coinContainer} key={item.id}>
						<div className={styles.coinName} onClick={() => navigateToCoin(item.id)}>
							<img className={styles.coinLogo} src={item.image} alt={item.name} />
							<p className={styles.coinTitle}>{item.name}</p>
							<p className={styles.coinSymbol}>{(item.symbol).toUpperCase()}</p>
						</div>
						<ModalWindow 
							btnValue={
							<div className={styles.clickWrapper} onClick={() => setTokenTransInfoId(item.id)}>
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
									<p>${item.profit.value}</p>
									<p>{item.profit.procent}%</p>
								</div>
							</div>}>
							<TransactionsMenu tokenTransInfoId={tokenTransInfoId} />
						</ModalWindow>
						<div className={styles.coinAdd}>
							<ModalWindow btnValue={<AddIcon/>}><AddTransactionMenu/></ModalWindow>						
						</div>
					</div>
					
				)
			})}
		</section>
	)
}