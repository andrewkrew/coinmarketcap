import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/useRedux";
import { candleSelector } from "../../redux/selectors";
import { fetchCandleDataThunk } from "../../redux";
import styles from './styles.module.css'
import { Box } from "@mui/material";
import { LoadingCircle } from "../ui/loadingCircle";

export const CandleStickChart = ({coinId = undefined, timeInterval} 
		: {coinId: string | undefined, timeInterval: string}) => {
	
	const dispatch = useAppDispatch();
	const {isLoading, coinCandleData, error} = useAppSelector(candleSelector);

	useEffect(() => {
		if(coinId) dispatch(fetchCandleDataThunk({id: coinId, days: timeInterval}))
	}, [dispatch, coinId, timeInterval])

	const options: ApexOptions = {
		title: {
			text: `${coinId?.toUpperCase()} Chart`,
			align: 'left'
		},
		xaxis: {
			type: 'datetime'
		},
		yaxis: {
			tooltip: {
				enabled: true
			}
		},
		noData: {
			text: 'Loading...'
		},
	}

	if(!coinId) return <p>!!!Error!!!</p>
	if(!coinCandleData) return <Box sx={{
				width: '100%', 
				height: '100%', 
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center'
			}}>
				<LoadingCircle/>
		</Box>

	return (
		<div className={styles.chart}>
			<div>{error && <p>{error}</p>}</div>
			{ !isLoading 
			? <ReactApexChart 
				options={options} 
				series={[{data: coinCandleData}]} 
				type="candlestick" 
				height={'100%'} 
				width={'100%'}
			/> 
			: 
			<Box sx={{
				width: '100%', 
				height: '100%', 
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center'}}>
					<LoadingCircle/>
		</Box>
		}
		</div>
	);
}