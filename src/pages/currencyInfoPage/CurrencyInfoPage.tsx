import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { CandleStickChart } from '../../components/candleStickChart';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux';
import { coinsSelector } from '../../redux/selectors';
import { fetchCoinDetailsThunk } from '../../redux';
import { Button } from '@mui/base';
import { CurrencyConverter } from '../../components/ui/сurrencyConverter';
import { Link } from '@mui/material';

export const CurrencyInfoPage = () => {

	const [timeInterval, setTimeInterval] = useState<string>('1');
	const {coinId} = useParams();
	const dispatch = useAppDispatch();
	const {coinDetailData} = useAppSelector(coinsSelector);
	const navigate = useNavigate();
	// const {isLoading, coinDetailData, error} = useAppSelector(coinsSelector);

	useEffect(() => {
		dispatch(fetchCoinDetailsThunk(coinId as string))
	}, [dispatch, coinId])

	return (
		<section className={styles.notFound}>
			<h1><img src={coinDetailData.image.small} alt={coinId}/>{coinDetailData.name} {coinDetailData.symbol.toUpperCase()}</h1>
			<Button onClick={() => navigate(-1)}>Back</Button>
			<div>
				<Button onClick={() => setTimeInterval('1')}>1d</Button>
				<Button onClick={() => setTimeInterval('7')}>7d</Button>
				<Button onClick={() => setTimeInterval('30')}>1mounth</Button>
				<Button onClick={() => setTimeInterval('365')}>1year</Button>
				<Button onClick={() => setTimeInterval('max')}>all time</Button>
			</div>
			<CandleStickChart coinId={coinId} timeInterval={timeInterval}/>
			<CurrencyConverter/>
			<div className={styles.coin__info}>
				<div>
					<p>Price: $ {coinDetailData.market_data.current_price.usd}</p>
					<p>Price 24h: $ {coinDetailData.market_data.price_change_24h}</p>
					<p>Price 24h: {coinDetailData.market_data.price_change_percentage_24h.toFixed(2)} %</p>
				</div>
				<p>Market_cap_rank: {coinDetailData.market_cap_rank}</p>
				<p>Market_cap: $ {coinDetailData.market_data.market_cap.usd}</p>
				<p>Total Volume: $ {coinDetailData.market_data.total_volume.usd}</p>
				<p>Circulating supply: {coinDetailData.market_data.circulating_supply} {coinDetailData.symbol.toUpperCase()}</p>
				<p>Total supply: {coinDetailData.market_data.total_supply} {coinDetailData.symbol.toUpperCase()}</p>
				<div>
					<p>ATH: $ {coinDetailData.market_data.ath.usd}</p>
					<p>Date: {coinDetailData.market_data.ath_date.usd}</p>
				</div>
				

				<Link target='_blank' rel="noopener" href={coinDetailData.links.homepage[0]}>Homepage</Link>
				<Link target='_blank' rel="noopener" href={coinDetailData.links.blockchain_site[0]}>Blockchin Site</Link>
				<p>Genesis date: {coinDetailData.genesis_date}</p>
				<p dangerouslySetInnerHTML={{__html:coinDetailData.description.en}}></p>
			</div>
		</section>
	)
}