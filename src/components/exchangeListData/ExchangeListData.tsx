import { ExchangesAllData } from '../../shared/api/types'
import styles from './styles.module.css'

export const ExchangeListData = (item: ExchangesAllData) => {
	return (
		<div className={styles.container}>
			<p className={styles.exchangeNumber}>{item.trust_score_rank}</p>
			<div className={styles.exchangeInfo}>
				<img className={styles.exchangeLogo} src={item.image} alt={item.name} />
				<p>{item.name}</p>
			</div>
			<p className={styles.exchangePrice}>{item.trust_score}</p>
			<p className={styles.exchangeVolume}>{item.trade_volume_24h_btc}</p>
		</div>
	)
}