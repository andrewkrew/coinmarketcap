import { useEffect } from 'react';
import styles from './styles.module.css'
import { ExchangesAllData } from '../../shared/api/types';
import { ExchangeListData } from '../../components/exchangeListData';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux';
import { exchangesSelector } from '../../redux/selectors';
import { useCustomPagination } from '../../shared/hooks/useCustomPagination';
import { fetchExchangesThunk } from '../../redux';
import { Pagination, PaginationItem } from '@mui/material';
import { Link as Links} from 'react-router-dom';
import { SelectPagination } from '../../components/ui/selectPagination';

export const ExchangesPage = () => {

	const dispatch = useAppDispatch();
	// const {isLoading, exchangesData, error} = useAppSelector(exchangesSelector);
	const {exchangesData} = useAppSelector(exchangesSelector);

	const {EXCHANGES_NUMBER, page, setPage, itemQty, setItemQty} = useCustomPagination();

	useEffect(() => {
		dispatch(fetchExchangesThunk({per_page: +itemQty, page}));
	}, [dispatch, page, itemQty])


	// const [data, setData] = useState([] as ExchangesAllData[]);

	// useEffect(() => {
	// 	fetch('https://api.coingecko.com/api/v3/exchanges?per_page=100&page=1&x_cg_demo_api_key=CG-LxtsanKr45RpMiLLJDJgKJed')
	// 	.then(res => res.json())
	// 	.then((res) => setData(res))
	// }, []);

	return (
		<section className={styles.exchanges}>
			<h1 className={styles.title}>Top Crypto Exchanges Ranked by Trust Score</h1>
			<div>
				<SelectPagination 
					coinsQty={itemQty} 
					setCionsQty={setItemQty}
					// coinsQty={itemQtyRef} 
				/>
			</div>
			<div className={styles.container}>
				<p className={styles.exchangeNumber}>#</p>
				<p className={styles.exchangeName}>Exchange</p>
				<p className={styles.exchangeScore}>Trust score</p>
				<p className={styles.exchangeVolume}>Volume(24h)</p>
			</div>
			{exchangesData.map((item: ExchangesAllData) => {
				return(<ExchangeListData key={item.id} {...item}/>)
			})}
			<Pagination 
					count={EXCHANGES_NUMBER / +itemQty} 
					// count={COINS_NUMBER / +itemQtyRef.current} 
					page={page}
					onChange={(_, num) => setPage(num)}
					variant="outlined" 
					shape="rounded" 
					showFirstButton
					showLastButton
					renderItem={(item) => {
						return(
							<PaginationItem
								component={Links}
								to={`?page=${item.page}`}
								{...item}
							/>
						)
					}}
				/>
		</section>
	)
}