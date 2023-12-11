import { Dispatch, useEffect, useLayoutEffect } from 'react';
import styles from './styles.module.css'
import { CoinsAllData } from '../../shared/api/types';
import { CoinListData } from '../../components/coinListData';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux';
import { coinsSelector } from '../../redux/selectors';
import { fetchCoinsThunk } from '../../redux';
import { Box, Pagination, PaginationItem } from '@mui/material';
import { SelectPagination } from '../../components/ui/selectPagination';
import { Link as Links} from 'react-router-dom';
import { useCustomPagination } from '../../shared/hooks/useCustomPagination';
import { AutocompleteSearch } from '../../components/ui/autocompleteSearch';
import { useListenerY } from '../../shared/hooks/useListenerY';
import { ScrollToTopBtn } from '../../components/ui/scrollToTopBtn';
import { LoadingCircle } from '../../components/ui/loadingCircle';
import { paginationStyle } from '../../shared/api/styles';


export const CurrenciesPage = (
	{offsetY, setOffsetY}
	: {offsetY: number, setOffsetY: Dispatch<React.SetStateAction<number>>}
) => {

	const {isLoading, coinsData, error} = useAppSelector(coinsSelector);
	const dispatch = useAppDispatch();
	const {COINS_NUMBER, page, setPage, coinsQnty} = useCustomPagination();

	useListenerY(setOffsetY);

	useLayoutEffect(() => {
		setTimeout(() => {
			window.scrollTo({
				top: offsetY,
			});
		}, 10)
}, [])

	useEffect(() => {
		dispatch(fetchCoinsThunk({per_page: +coinsQnty, page}));
	}, [dispatch, page, coinsQnty])

	if (isLoading) {
		return <Box sx={{
				width: '100vw', 
				height: '80vh', 
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center'
			}}>
				<LoadingCircle/>
		</Box>
	} else if (error) {
		return <p>{error}</p>
	} else {
		return (
			<>
				<section className={`wrapper ${styles.coins}`}>
					<h1 className={styles.title}>Today's Cryptocurrency Prices by Market Cap</h1>
					<Box sx={{display: 'flex', justifyContent: 'space-between', marginBottom: 3}}>
						<AutocompleteSearch type='currencies'/>
						<SelectPagination 
							coinsQty={coinsQnty} 
							type='coins'
						/>
					</Box>
					<div className={styles.container}>
						<p className={styles.coinNumber}>#</p>
						<p className={styles.coinName}>Name</p>
						<p className={styles.coinPrice}>Price, $</p>
						<p className={styles.coin24H}>24h%</p>
						<p className={styles.coinMarketCap}>Market, $</p>
						<p className={styles.coinVolume}>Volume(24h, $)</p>
						{coinsData.map((item: CoinsAllData) => {
						return <CoinListData key={item.id} {...item}/>
					})}
					</div>
					<div className={styles.pagination}>
						<Pagination
							count={COINS_NUMBER / +coinsQnty} 
							page={page}
							onChange={(_, num) => {
								setPage(num);
								window.scrollTo({
									top: 0,
								});
							}}
							variant="outlined" 
							shape="rounded" 
							showFirstButton
							showLastButton
							color='secondary'
							sx={{...paginationStyle}}
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
				<ScrollToTopBtn/>
			</>
		)
	}
}