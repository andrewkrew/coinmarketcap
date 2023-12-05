import { useEffect } from 'react';
import styles from './styles.module.css'
import { CoinsAllData } from '../../shared/api/types';
import { CoinListData } from '../../components/coinListData';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux';
import { coinsSelector } from '../../redux/selectors';
import { fetchCoinsThunk } from '../../redux';
import { Pagination, PaginationItem } from '@mui/material';
import { SelectPagination } from '../../components/ui/selectPagination';
import { Link as Links} from 'react-router-dom';
import { useCustomPagination } from '../../shared/hooks/useCustomPagination';
import { AutocompleteSearch } from '../../components/ui/autocompleteSearch';


export const CurrenciesPage = () => {
	// const itemQtyRef = useRef('25');
	
	// const location = useLocation();
	// const COINS_NUMBER = 3000;
	// const [page, setPage] = useState(+location.search?.split('=')[1] || 1);
	// const [itemQty, setItemQty] = useState('25');

	const {coinsData} = useAppSelector(coinsSelector);
	// const {isLoading, coinsData, error} = useAppSelector(coinsSelector);
	const dispatch = useAppDispatch();

	const {COINS_NUMBER, page, setPage, itemQty, setItemQty} = useCustomPagination();

	useEffect(() => {
		dispatch(fetchCoinsThunk({per_page: +itemQty, page}));
	}, [dispatch, page, itemQty])

	// useEffect(() => {
	// 	dispatch(fetchCoinsThunk({per_page: +itemQtyRef.current, page}));
	// }, [dispatch, page, itemQtyRef])


	return (
		<section className={styles.coins}>
			<h1 className={styles.title}>Today's Cryptocurrency Prices by Market Cap</h1>
			<AutocompleteSearch type='currencies'/>
			<div>
				<SelectPagination 
					coinsQty={itemQty} 
					setCionsQty={setItemQty}
					// coinsQty={itemQtyRef} 
				/>
			</div>
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
			<div>
				<Pagination 
					count={COINS_NUMBER / +itemQty} 
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
			</div>
		</section>
	)
}