import { Link } from "react-router-dom"
import styles from './styles.module.css'
// import { useAppSelector } from "../../shared/hooks/useRedux"
// import { themeSelector } from "../../redux/selectors"
import { LinkBtn } from "../../components/ui/linkBtn"
import { useScrollTop } from "../../shared/hooks/useScrolltop";

export const HomePage = () => {

	// const {theme} = useAppSelector(themeSelector)
	useScrollTop();

	return (
		// <section className={theme === 'light' ? styles.home : `${styles.home} ${styles.home_dark}`}>
		<section className={styles.home}>
			<div className={`wrapper ${styles.wrapper}`}>
				<div className={styles.home__banner}>
					<h1 className={styles.home__title}>Where is the world?</h1>
					<Link className={styles.home__link} to='/currencies'>
						<LinkBtn>Crypto currencies list</LinkBtn>
					</Link>
				</div>
				<p className={styles.home__info}>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum soluta distinctio iste iusto atque voluptatem dolor, quaerat enim sunt veniam minus quis. Dolore dolores odio veniam, recusandae nostrum earum accusamus?
				Rem reiciendis reprehenderit corrupti velit sed, vel amet deserunt fuga debitis rerum. Impedit, quod nulla. 
				</p>
			</div>
		</section>
	)
}