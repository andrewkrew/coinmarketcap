import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { LinkBtn } from '../../components/ui/linkBtn'

export const NotFound = () => {

	return (
		<section className={styles.notFound}>
			<div className={`wrapper ${styles.wrapper}`}>
				<h1 className={styles.notFound__message}>Nothing Found... :(</h1>	
				<Link className={styles.notFound__btn} to='/'><LinkBtn>Go home page</LinkBtn></Link>
			</div>
		</section>
	)
}