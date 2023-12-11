import { useNavigate } from 'react-router-dom';
import { ExchangesAllData } from '../../shared/api/types'
import styles from './styles.module.css'

export const ExchangeListData = (item: ExchangesAllData) => {
	
	const navigate = useNavigate();
	const navigateToExchange = (exchangeId: string) => {
		navigate(`/exchanges/${exchangeId}`);
	}
	
	return (
		<>
			<p className={styles.exchangeNumber}>{item.trust_score_rank}</p>
			<div className={styles.exchangeInfo} onClick={() => navigateToExchange(item.id)}>
				<img className={styles.exchangeLogo} src={item.image} alt={item.name} />
				<p>{item.name}</p>
			</div>
			<p className={styles.exchangePrice}>{item.trust_score}</p>
			<p className={styles.exchangeVolume}>{item.trade_volume_24h_btc.toLocaleString('en')}</p>
		</>
	)
}