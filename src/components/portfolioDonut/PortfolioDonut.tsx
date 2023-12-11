import { ResponsivePie } from '@nivo/pie' 
import { useAppSelector } from '../../shared/hooks/useRedux';
import { portfolioDataSelector, themeSelector } from '../../redux/selectors';
import { getDataDonut } from '../../utilits';
import { UseResizeWidth } from '../../shared/hooks/useResizeWidth';

export const PortfolioDonut = () => { 

	const {tokens} = useAppSelector(portfolioDataSelector);
	const {theme} = useAppSelector(themeSelector);
	const dataDonut = getDataDonut(tokens);
	const {width} = UseResizeWidth();

	return ( 
		<ResponsivePie 
			data={dataDonut}  
			margin={width > 550 
				? { top: 20, right: 200, bottom: 20, left: 20 } 
				: { top: 20, right: 160, bottom: 20, left: 20 }} 
			sortByValue={true} 
			innerRadius={0.6} 
			padAngle={2} 
			cornerRadius={5} 
			activeOuterRadiusOffset={8} 
			borderWidth={1}
			colors={{ scheme: 'nivo' }}
			borderColor={{ 
				from: 'color', 
				modifiers: [ 
					[ 
						'darker', 
						0.3, 
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
					translateX: 130, 
					translateY: width > 400 ? 60 : 0, 
					itemsSpacing: 20, 
					itemWidth: 50, 
					itemHeight: 18, 
					itemTextColor: theme === 'light' ? 'black' : 'white', 
					itemDirection: 'left-to-right', 
					itemOpacity: 1, 
					symbolSize: 30, 
					symbolShape: 'circle', 
					effects: [ 
						{ 
							on: 'hover', 
							style: { 
								itemTextColor: 'grey',
							} 
						} 
					] 
				} 
			]}
		/> 
	) 
}