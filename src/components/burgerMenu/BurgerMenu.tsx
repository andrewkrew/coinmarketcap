import { NavigatonMenu } from '../navigatonMenu'
import { AuthBtn } from '../ui/authBtn'
import { ThemeToggleBtn } from '../ui/themeToggleBtn'
import styles from './styles.module.css'

export const BurgerMenu = ({isActive}: {isActive: boolean}) => {

	return (
		<div 
			className = {!isActive 
			? styles.burgerMenu__wrapper 
			: `${styles.burgerMenu__wrapper} ${styles.burgerMenu__wrapper_hide}`}>
				<div className={styles.burgerMenu}>
					<div className={styles.header__componentHide}>
						<NavigatonMenu/>
					</div>
					<div className={styles.header__componentHide}>
						<ThemeToggleBtn/>
					</div>
					<div className={styles.header__componentHide}>
						<AuthBtn/>
					</div>
				</div>
		</div>
		
	)
}