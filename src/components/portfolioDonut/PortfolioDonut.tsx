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
				// ? { top: 20, right: 200, bottom: 20, left: 20 } 
				? { top: 20, right: 150, bottom: 20, left: 0 } 
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
					translateX:  width > 550 ? 60 : 100, 
					translateY: width > 550 ? 60 : 50, 
					itemsSpacing:  width > 550 ? 20 : 10, 
					itemWidth: 50, 
					itemHeight: width > 550 ? 18 : 10, 
					itemTextColor: theme === 'light' ? 'black' : 'white', 
					itemDirection: 'left-to-right', 
					itemOpacity: 1, 
					symbolSize: width > 550 ? 30 : 15, 
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