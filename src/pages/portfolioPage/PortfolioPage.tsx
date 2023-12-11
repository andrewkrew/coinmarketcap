import { Portfolio } from '../../components/portfolio/Portfolio'
import { useScrollTop } from '../../shared/hooks/useScrolltop';

export const PortfolioPage = () => {

	useScrollTop();

	return (
		<Portfolio/>
	)
}