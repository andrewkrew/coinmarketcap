import { portfolioDataSelector } from '../../redux/selectors';
import { useAppSelector } from '../../shared/hooks/useRedux';
import styles from './styles.module.css'
import { TokensListData } from '../transactionsList';

export const PortfolioAssets = () => {
	const {tokens} = useAppSelector(portfolioDataSelector);

	return (
		<section className={styles.coins}>
			<div className={styles.container}>
				<p className={styles.coinName}>Name</p>
				<p className={styles.coinPrice}>Price, $</p>
				<p className={styles.coin24H}>24h%</p>
				<p className={styles.coinHold}>Holdings</p>
				<p className={styles.coinAvgPrice}>Avg. Buy Price</p>
				<p className={styles.coinProfit}>Profit/Loss</p>
				<p className={styles.coinAdd}>Add / Edit</p>
				{tokens.map((item) => {
					return (<TokensListData key={item.id} {...item} />)
				})}
			</div>
		</section>
	)
}