import { Portfolio } from '../../components/portfolio/Portfolio'
import { useScrollTop } from '../../shared/hooks/useScrolltop';
import styles from './styles.module.css'

export const PortfolioPage = () => {

	useScrollTop();

	return (
		<section className={styles.notFound}>
			<Portfolio/>
		</section>
	)
}