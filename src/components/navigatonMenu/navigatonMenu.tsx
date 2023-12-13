import { NavLink } from "react-router-dom"
import styles from './styles.module.css'

export const NavigatonMenu = ({setIsActive} : {setIsActive: (prev: boolean) => void}) => {
	
	const setActive = ({isActive}: {isActive:boolean}) => {
		return isActive ? `${styles.header__Link} ${styles.header__ActiveLink}` : `${styles.header__Link}`;
	}

	const closeBurgerMenu = () => {
		setIsActive(false);
	}

	return (
		<div className={styles.componentHide}>
			<div className={styles.header__nav}>
				<NavLink
					to='/' 
					className={setActive}
					onClick={closeBurgerMenu}>
					Home
				</NavLink>
				<NavLink 
					to='/currencies' 
					className={setActive}
					onClick={closeBurgerMenu}>
					Cryptocurrencies
				</NavLink>
				<NavLink 
					to='/exchanges' 
					className={setActive}
					onClick={closeBurgerMenu}>
					Exchanges
				</NavLink>
				<NavLink 
					to='/portfolio' 
					className={setActive}
					onClick={closeBurgerMenu}>
					Portfolio
				</NavLink>
			</div>
		</div>
	)
}
