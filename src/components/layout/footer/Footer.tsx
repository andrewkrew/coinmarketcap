import styles from './styles.module.css'
// import { useState } from 'react';
// import { MenuHeader } from '../menuHeader'
// import { ThemeToggle } from '../themeToggle';
// import { BurgerMenu } from '../burgerMenu';
// import { Link } from 'react-router-dom';
// import { useAppDispatch } from '../../shared/hooks/useRedux';
// import { BurgerBtn } from '../../ui/burgerBtn';

export const Footer = () => {
	
	// const [isActiveBurger, setIsActiveBurger] = useState<boolean>(false);
	// const dispatch = useAppDispatch();

	return (
	<footer className={styles.footer}>
		{/* <div className={styles.header__wrapper}>
			<Link 
				// onClick={(clearOffsetY)}
				className={styles.header__siteName} to='/'>
				<p>Where is the world?</p>
			</Link>
			<div className={styles.header__componentHide}>
				<MenuHeader/>
			</div>
			<div className={styles.header__componentHide}>
				<ThemeToggle/>
			</div>
			<BurgerBtn isActive={isActiveBurger} setIsActive={setIsActiveBurger}/>
			<BurgerMenu isActive={isActiveBurger}/>
		</div> */}
		<h1>FOOTER</h1>
	</footer>
	)
}