import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import { ExchangesAllData } from '../../shared/api/types';
import { ExchangeListData } from '../../components/exchangeListData';

export const ExchangesPage = () => {

	const [data, setData] = useState([] as ExchangesAllData[]);

	useEffect(() => {
		fetch('https://api.coingecko.com/api/v3/exchanges?per_page=100&page=1&x_cg_demo_api_key=CG-LxtsanKr45RpMiLLJDJgKJed')
		.then(res => res.json())
		.then((res) => setData(res))
	}, []);

	return (
		<section className={styles.exchanges}>
			<h1 className={styles.title}>Top Crypto Exchanges Ranked by Trust Score</h1>
			<div className={styles.container}>
				<p className={styles.exchangeNumber}>#</p>
				<p className={styles.exchangeName}>Exchange</p>
				<p className={styles.exchangeScore}>Trust score</p>
				<p className={styles.exchangeVolume}>Volume(24h)</p>
			</div>
			{data.map((item: ExchangesAllData) => {
				return(<ExchangeListData key={item.id} {...item}/>)
			})}
		</section>
	)
}