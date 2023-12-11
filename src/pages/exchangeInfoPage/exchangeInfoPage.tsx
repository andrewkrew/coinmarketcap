import { Link, useNavigate, useParams } from 'react-router-dom';
import { exchangesSelector } from '../../redux/selectors'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux'
import styles from './styles.module.css'
import { useEffect } from 'react';
import { fetchExchangeDetailsThunk } from '../../redux';
import { Box } from '@mui/material';
import { useScrollTop } from '../../shared/hooks/useScrolltop';
import { LoadingCircle } from '../../components/ui/loadingCircle';
import { SecondaryBtn } from '../../components/ui/secondaryBtn';

export const ExchangeInfoPage = () => {

	useScrollTop()

	const {isLoading, exchangeDetailData, error} = useAppSelector(exchangesSelector);
	const {exchangeId} = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchExchangeDetailsThunk(exchangeId as string))
	}, [dispatch, exchangeId])

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
			<section className={`wrapper ${styles.exhange}`}>
				<div className={styles.header}>
					<Box onClick={() => navigate(-1)}>
						<SecondaryBtn>Back</SecondaryBtn>
					</Box>
					<div className={styles.title}>
						<img 
							src={exchangeDetailData.image} 
							alt={exchangeId}
						/>
						{exchangeDetailData.name}
					</div>
				</div>
				<div>
					<div className={styles.container}>
						<p>Trusted score:</p>
						<p>{exchangeDetailData.trust_score}</p>
						<p>Trusted score rank:</p>
						<p>{exchangeDetailData.trust_score_rank}</p>
						<p>Trade volume 24h BTC:</p>
						<p>{(+exchangeDetailData.trade_volume_24h_btc?.toFixed(0)).toLocaleString('en')}</p>
						<p>Country:</p>
						<p>{exchangeDetailData.country}</p>
						<p>Year established:</p>
						<p>{exchangeDetailData.year_established}</p>
						<p>Link:</p>
						<Link to={exchangeDetailData.url} target='blank'>{exchangeDetailData.url}</Link>
					</div>
					<p className={styles.exchange__desc} dangerouslySetInnerHTML={{__html:exchangeDetailData.description}}></p>
				</div>
			</section>
		)
	}
}