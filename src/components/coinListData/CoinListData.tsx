import { useNavigate } from 'react-router-dom';
import { CoinsAllData } from '../../shared/api/types'
import styles from './styles.module.css'
import { PriceIndicator } from '../priceIndicator';

export const CoinListData = (item: CoinsAllData) => {
	
	const navigate = useNavigate();
	const navigateToCoin = (coinId: string) => {
		navigate(`/currencies/${coinId}`);
	}
	
	return (
		<div className={styles.container}>
			<p className={styles.watchlist}>S</p>
			<p className={styles.coinNumber}>{item.market_cap_rank}</p>
			<div className={styles.coinInfo} onClick={() => navigateToCoin(item.id)}>
				<img className={styles.coinLogo} src={item.image} alt={item.name} />
				<p>{item.name}</p>
				<p>{(item.symbol).toUpperCase()}</p>
			</div>
			<p className={styles.coinPrice}>{item.current_price}</p>
			<div className={styles.coin24H}>
				<PriceIndicator>
					{+item.price_change_percentage_24h.toFixed(2)}
				</PriceIndicator>
			</div>
			<p className={styles.coinMarketCap}>{item.market_cap}</p>
			<p className={styles.coinVolume}>{item.total_volume}</p>
		</div>
	)
}