import { useNavigate, useParams } from 'react-router-dom';
import { exchangesSelector } from '../../redux/selectors'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux'
import styles from './styles.module.css'
import { useEffect } from 'react';
import { fetchExchangeDetailsThunk } from '../../redux';
import { Button } from '@mui/material';
import { useScrollTop } from '../../shared/hooks/useScrolltop';

export const ExchangeInfoPage = () => {

	useScrollTop()

	// const {isLoading, exchangeDetailData, error} = useAppSelector(exchangesSelector);
	const {exchangeDetailData} = useAppSelector(exchangesSelector);
	const {exchangeId} = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchExchangeDetailsThunk(exchangeId as string))
	}, [dispatch, exchangeId])

	return (
		<section className={styles.notFound}>
			<h1>ExchangeInfoPage PAGE</h1>
			<Button onClick={() => navigate(-1)}>Back</Button>
			<pre>{JSON.stringify(exchangeDetailData, null, 2)}</pre>
		</section>
	)
}