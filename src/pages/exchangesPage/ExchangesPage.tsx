import { Dispatch, useEffect, useLayoutEffect } from 'react';
import styles from './styles.module.css'
import { ExchangesAllData } from '../../shared/api/types';
import { ExchangeListData } from '../../components/exchangeListData';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux';
import { exchangesSelector } from '../../redux/selectors';
import { useCustomPagination } from '../../shared/hooks/useCustomPagination';
import { fetchExchangesThunk } from '../../redux';
import { Box, Pagination, PaginationItem } from '@mui/material';
import { Link as Links} from 'react-router-dom';
import { SelectPagination } from '../../components/ui/selectPagination';
import { AutocompleteSearch } from '../../components/ui/autocompleteSearch';
import { useListenerY } from '../../shared/hooks/useListenerY';
import { ScrollToTopBtn } from '../../components/ui/scrollToTopBtn';
import { LoadingCircle } from '../../components/ui/loadingCircle';
import { paginationStyle } from '../../shared/api/styles';

export const ExchangesPage = (	
	{offsetY, setOffsetY}
	: {offsetY: number, setOffsetY: Dispatch<React.SetStateAction<number>>}
) => {

	useListenerY(setOffsetY);

	useLayoutEffect(() => {
		setTimeout(() => {
			window.scrollTo({
				top: offsetY,
			});
		}, 10)
}, [])

	const dispatch = useAppDispatch();
	const {isLoading, exchangesData, error} = useAppSelector(exchangesSelector);
	const {EXCHANGES_NUMBER, page, setPage, exchangesQnty} = useCustomPagination();

	useEffect(() => {
		dispatch(fetchExchangesThunk({per_page: +exchangesQnty, page}));
	}, [dispatch, page, exchangesQnty])

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
				<section className={`wrapper ${styles.exchanges}`}>
					<h1 className={styles.title}>Top Crypto Exchanges Ranked by Trust Score</h1>
					<Box sx={{display: 'flex', justifyContent: 'space-between', marginBottom: 3}}>
						<AutocompleteSearch type='exchanges'/>
						<SelectPagination 
							coinsQty={exchangesQnty} 
							type='exchanges'
						/>
					</Box>
					<div className={styles.container}>
						<p className={styles.exchangeNumber}>#</p>
						<p className={styles.exchangeName}>Exchange</p>
						<p className={styles.exchangeScore}>Trust score</p>
						<p className={styles.exchangeVolume}>Volume(24h), BTC</p>
						{exchangesData.map((item: ExchangesAllData) => {
							return(<ExchangeListData key={item.id} {...item}/>)
						})}
					</div>
					<div className={styles.pagination}>
						<Pagination 
							count={EXCHANGES_NUMBER / +exchangesQnty} 
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