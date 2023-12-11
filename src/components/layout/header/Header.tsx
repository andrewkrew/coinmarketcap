import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { NavigatonMenu } from '../../navigatonMenu'
import { ThemeToggleBtn } from '../../ui/themeToggleBtn'
import { AuthBtn } from '../../ui/authBtn'
import { useState } from 'react';
import { BurgerBtn } from '../../ui/burgerBtn';
import { BurgerMenu } from '../../burgerMenu'

export const Header = () => {
	
	const [isActiveBurger, setIsActiveBurger] = useState<boolean>(false);

	return (
	<header className={styles.header}>
		<div className={styles.header__wrapper}>
			<Link 
				className={styles.header__siteName} to='/'>
				Coinmarketcap
			</Link>
			<div className={styles.header__componentHide}>
				<NavigatonMenu/>
			</div>
			<div className={styles.header__componentHide}>
				<ThemeToggleBtn/>
			</div>
			<div className={styles.header__componentHide}>
				<AuthBtn/>
			</div>
			<BurgerBtn isActive={isActiveBurger} setIsActive={setIsActiveBurger}/>
			<BurgerMenu isActive={isActiveBurger}/>
		</div>
	</header>
	)
}