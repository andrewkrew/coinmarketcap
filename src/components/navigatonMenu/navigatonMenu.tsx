import { NavLink } from "react-router-dom"
import styles from './styles.module.css'

export const NavigatonMenu = () => {
	
	const setActive = ({isActive}: {isActive:boolean}) => {
		return isActive ? `${styles.header__Link} ${styles.header__ActiveLink}` : `${styles.header__Link}`;
	}

	return (
		<div className={styles.componentHide}>
			<div className={styles.header__nav}>
				<NavLink
					to='/' 
					className={setActive}>
					Home
				</NavLink>
				<NavLink 
					to='/currencies' 
					className={setActive}>
					Cryptocurrencies
				</NavLink>
				<NavLink 
					to='/exchanges' 
					className={setActive}>
					Exchanges
				</NavLink>
				<NavLink 
					to='/portfolio' 
					className={setActive}>
					Portfolio
				</NavLink>
			</div>
		</div>
	)
}
