import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { CandleStickChart } from '../../components/candleStickChart';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux';
import { coinsSelector } from '../../redux/selectors';
import { fetchCoinDetailsThunk } from '../../redux';
import { CurrencyConverter } from '../../components/ui/currencyConverter';
import { Box, Button, Link } from '@mui/material';
import { useScrollTop } from '../../shared/hooks/useScrolltop';
import { LoadingCircle } from '../../components/ui/loadingCircle';
import { SecondaryBtn } from '../../components/ui/secondaryBtn';
import { PriceIndicator } from '../../components/priceIndicator';

export const CurrencyInfoPage = () => {
	
	const {isLoading, coinDetailData, error} = useAppSelector(coinsSelector);
	const [timeInterval, setTimeInterval] = useState<string>('1');
	const {coinId} = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useScrollTop();

	useEffect(() => {
		dispatch(fetchCoinDetailsThunk(coinId as string))
	}, [dispatch, coinId])

	return (
		<section className={`wrapper ${styles.tokenPage}`}>
			<div>{error && <p>{error}</p>}</div>
			{
				(!isLoading) ? (Object?.keys(coinDetailData).length !== 0 ?
			<>
				<div className={styles.header}>
					<Box onClick={() => navigate(-1)}>
						<SecondaryBtn>Back</SecondaryBtn>
					</Box>
					<div className={styles.title}>
						<img 
							src={coinDetailData.image.large} 
							alt={coinId}
							className={styles.image}
						/>
						{coinDetailData.name} {coinDetailData.symbol.toUpperCase()}
					</div>
					<p className={styles.price}>$ {coinDetailData.market_data.current_price.usd}</p>
				</div>			
				<div className={styles.buttons}>
					<Button color='inherit' size='small' onClick={() => setTimeInterval('1')}>1d</Button>
					<Button color='inherit' size='small' onClick={() => setTimeInterval('7')}>7d</Button>
					<Button color='inherit' size='small' onClick={() => setTimeInterval('30')}>1mounth</Button>
					<Button color='inherit' size='small' onClick={() => setTimeInterval('365')}>1year</Button>
					<Button color='inherit' size='small' onClick={() => setTimeInterval('max')}>all time</Button>
				</div>
				<div className={styles.candleChart}>
					<CandleStickChart coinId={coinId} timeInterval={timeInterval}/>		
				</div>
				<div className={styles.coinContainer}>
					<div className={styles.left_bar}>
						<CurrencyConverter/>
						<div className={styles.coin__info}>
							<p>Price:</p>
							<p>$ {coinDetailData.market_data.current_price.usd}</p>
							<p>Price 24h $:</p>
							<p>$ {coinDetailData.market_data.price_change_24h}</p>
							<p>Price 24h %:</p>
							<div>				
								<PriceIndicator>
									{+coinDetailData.market_data.price_change_percentage_24h?.toFixed(2)}
								</PriceIndicator>
							</div>
							<p>Market_cap_rank:</p>
							<p>{coinDetailData.market_cap_rank}</p>
							<p>Market_cap: $</p>
							<p>{coinDetailData.market_data.market_cap.usd.toLocaleString('en')}</p>
							<p>Total Volume: $</p>
							<p>{coinDetailData.market_data.total_volume.usd.toLocaleString('en')}</p>
							<p>Circulating supply:</p>
							<p>{(+coinDetailData.market_data.circulating_supply.toFixed(0)).toLocaleString('en')} {coinDetailData.symbol.toUpperCase()}</p>
							<p>Total supply:</p>
							<p>{(+coinDetailData.market_data.total_supply.toFixed(0)).toLocaleString('en')} {coinDetailData.symbol.toUpperCase()}</p>
							<p>ATH: $</p>
							<p>{coinDetailData.market_data.ath.usd}</p>
							<p>Date:</p>				
							<p>{coinDetailData.market_data.ath_date.usd}</p>			
							<p>Links:</p>	
							<div>
								<Link sx={{mr: 1}} target='_blank' rel="noopener" href={coinDetailData.links.homepage[0]}>Homepage</Link>
								<Link target='_blank' rel="noopener" href={coinDetailData.links.blockchain_site[0]}>Blockchin Site</Link>
							</div>			
							<p>Genesis date:</p>
							<p>{coinDetailData.genesis_date}</p>
						</div>
					</div>
					<p className={styles.coin__desc} dangerouslySetInnerHTML={{__html:coinDetailData.description.en}}></p>
				</div>
			</>
			: '') 
			: <Box sx={{
				width: '100vw', 
				height: '80vh', 
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center'
			}}>
				<LoadingCircle/>
		</Box>}
		</section>
	)
}