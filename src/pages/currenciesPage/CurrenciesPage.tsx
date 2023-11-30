import { useEffect } from 'react';
import styles from './styles.module.css'
import { CoinsAllData } from '../../shared/api/types';
import { CoinListData } from '../../components/coinListData';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux';
import { coinsSelector } from '../../redux/selectors';
import { fetchCoinsThunk } from '../../redux';

export const CurrenciesPage = () => {

	const {coinsData} = useAppSelector(coinsSelector);
	// const {isLoading, coinsData, error} = useAppSelector(coinsSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchCoinsThunk({per_page: 100, page: 1}));
	}, [dispatch])

	return (
		<section className={styles.coins}>
			<h1 className={styles.title}>Today's Cryptocurrency Prices by Market Cap</h1>
			<div className={styles.container}>
				<p className={styles.watchlist}>	</p>
				<p className={styles.coinNumber}>#</p>
				<p className={styles.coinName}>Name</p>
				<p className={styles.coinPrice}>Price, $</p>
				<p className={styles.coin24H}>24h%</p>
				<p className={styles.coinMarketCap}>Market, $</p>
				<p className={styles.coinVolume}>Volume(24h, $)</p>
			</div>
			{coinsData.map((item: CoinsAllData) => {
				return( 
					<CoinListData key={item.id} {...item}/>
				)
			})}
		</section>
	)
}