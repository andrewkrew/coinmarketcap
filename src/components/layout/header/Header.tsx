import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { NavigatonMenu } from '../../navigatonMenu'
import { ThemeToggleBtn } from '../../ui/themeToggleBtn'
import { AuthBtn } from '../../ui/authBtn'
// import { useState } from 'react';
// import { MenuHeader } from '../menuHeader'
// import { ThemeToggle } from '../themeToggle';
// import { BurgerMenu } from '../burgerMenu';
// import { Link } from 'react-router-dom';
// import { useAppDispatch } from '../../shared/hooks/useRedux';
// import { BurgerBtn } from '../../ui/burgerBtn';

export const Header = () => {
	
	// const [isActiveBurger, setIsActiveBurger] = useState<boolean>(false);
	// const dispatch = useAppDispatch();

	return (
	<header className={styles.header}>
		<div className={styles.header__wrapper}>
			<Link 
				// onClick={(clearOffsetY)}
				className={styles.header__siteName} to='/'>
				<p>CoinMarketCap</p>
			</Link>
			<div className={styles.header__componentHide}>
				<NavigatonMenu/>
			</div>
			<div className={styles.header__componentHide}>
				<ThemeToggleBtn/>
			</div>
			<div>
				<AuthBtn/>
			</div>
			{/* <BurgerBtn isActive={isActiveBurger} setIsActive={setIsActiveBurger}/>
			<BurgerMenu isActive={isActiveBurger}/> */}
		</div>
	</header>
	)
}