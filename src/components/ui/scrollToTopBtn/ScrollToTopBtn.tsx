import { themeSelector } from '../../../redux/selectors';
import { useAppSelector } from '../../../shared/hooks/useRedux';
import styles from './styles.module.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export const ScrollToTopBtn = () => {
	
	const {theme} = useAppSelector(themeSelector)

	const goTop = ():void => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}
	
	return (
		<div 
			className={(theme === 'light') ? styles.pageUp : `${styles.pageUp} ${styles.pageUp_dark}`}
			onClick={goTop}
		>
			<KeyboardArrowUpIcon/>
		</div>
	)
}