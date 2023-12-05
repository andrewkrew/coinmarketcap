import { Dispatch, useEffect, useLayoutEffect } from 'react';
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
import { AutocompleteSearch } from '../../components/ui/autocompleteSearch';
import { useListenerY } from '../../shared/hooks/useListenerY';
import { ScrollToTopBtn } from '../../components/ui/scrollToTopBtn';

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
	// const {isLoading, exchangesData, error} = useAppSelector(exchangesSelector);
	const {exchangesData} = useAppSelector(exchangesSelector);

	const {EXCHANGES_NUMBER, page, setPage, exchangesQnty} = useCustomPagination();

	useEffect(() => {
		dispatch(fetchExchangesThunk({per_page: +exchangesQnty, page}));
	}, [dispatch, page, exchangesQnty])

	return (
		<>
			<section className={styles.exchanges}>
				<h1 className={styles.title}>Top Crypto Exchanges Ranked by Trust Score</h1>
				<AutocompleteSearch type='exchanges'/>
				<div>
					<SelectPagination 
						coinsQty={exchangesQnty} 
						type='exchanges'
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
						count={EXCHANGES_NUMBER / +exchangesQnty} 
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
			<ScrollToTopBtn/>
		</>
	)
}