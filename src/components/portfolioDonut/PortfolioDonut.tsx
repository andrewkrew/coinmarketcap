import { ResponsivePie } from '@nivo/pie' 
import { useAppSelector } from '../../shared/hooks/useRedux';
import { portfolioDataSelector } from '../../redux/selectors';
import { getDataDonut } from '../../utilits';

export const PortfolioDonut = () => { 

	const {tokens} = useAppSelector(portfolioDataSelector);
	const dataDonut = getDataDonut(tokens);

	return ( 
		<ResponsivePie 
			data={dataDonut}  
			margin={{ top: 20, right: 160, bottom: 80, left: 0 }} 
			sortByValue={true} 
			innerRadius={0.6} 
			padAngle={2} 
			cornerRadius={5} 
			activeOuterRadiusOffset={8} 
			borderWidth={1} 
			borderColor={{ 
				from: 'color', 
				modifiers: [ 
					[ 
						'darker', 
						0.2, 
					] 
				] 
			}} 
			enableArcLinkLabels={false} 
			arcLinkLabelsSkipAngle={10} 
			arcLinkLabelsTextColor="#333333" 
			arcLinkLabelsThickness={2} 
			arcLinkLabelsColor={{ from: 'color' }} 
			arcLabelsSkipAngle={10} 
			arcLabelsTextColor={{ 
				from: 'color', 
				modifiers: [ 
					[ 
						'darker', 
						2 
					] 
				] 
			}} 
			legends={[ 
				{ 
					anchor: 'top-right', 
					direction: 'column', 
					justify: false, 
					translateX: 100, 
					translateY: 20, 
					itemsSpacing: 20, 
					itemWidth: 100, 
					itemHeight: 18, 
					itemTextColor: '#999', 
					itemDirection: 'left-to-right', 
					itemOpacity: 1, 
					symbolSize: 30, 
					symbolShape: 'circle', 
					effects: [ 
						{ 
							on: 'hover', 
							style: { 
								itemTextColor: '#000' 
							} 
						} 
					] 
				} 
			]} 
		/> 
	) 
}