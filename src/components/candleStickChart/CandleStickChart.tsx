import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/useRedux";
import { coinsSelector } from "../../redux/selectors";
import { fetchCandleDataThunk } from "../../redux";

export const CandleStickChart = ({coinId = undefined, timeInterval} 
		: {coinId: string | undefined, timeInterval: string}) => {
	
	const dispatch = useAppDispatch();
	// const {	isLoading, coinCandleData, error} = useAppSelector(coinsSelector);
	const {coinCandleData} = useAppSelector(coinsSelector);

	useEffect(() => {
		if(coinId) dispatch(fetchCandleDataThunk({id: coinId, days: timeInterval}))
	}, [dispatch, coinId, timeInterval])

	const options: ApexOptions = {
		title: {
			text: 'CandleStick Chart',
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
	if(!coinCandleData) return <p>loading...</p>
	return (
		<div id="chart">
			<ReactApexChart 
				options={options} 
				series={[{data: coinCandleData}]} 
				type="candlestick" 
				height={350} 
				width={600}
			/>
			{/* <pre>{JSON.stringify([{data: coinCandleData}], null ,2)}</pre> */}
		</div>
	);
}