import { NavLink } from "react-router-dom"
import styles from './styles.module.css'

export const NavigatonMenu = () => {
	
	// const {authorization, userName} = useAppSelector(authSelector);
	// const dispatch = useAppDispatch();
	// const navigate = useNavigate();

	// const clearOffsetY = () => {
	// 	dispatch(setOffsetY(0));
	// }

	// const setActive = ({isActive}: {isActive:boolean}) => {
	// 	return isActive ? `${styles.header__Link} ${styles.header__ActiveLink}` : `${styles.header__Link}`;
	// }

	// const logOut = () => {
	// 	dispatch(logoutThunk());
	// 	navigate('/', {replace: true});
	// }

	return (
		<div className='wrapper__compomemt-hide'>
			<div className={styles.header__nav}>
				<NavLink
					to='/' 
					// className={setActive}
				>
					Home
				</NavLink>
				<NavLink 
					// onClick={clearOffsetY} 
					to='/currencies' 
					// className={setActive}
				>
					Cryptocurrencies
				</NavLink>
				<NavLink 
					to='/exchanges' 
					// className={setActive}
				>
					Exchanges
				</NavLink>
				<NavLink 
					to='/watchlist' 
					// className={setActive}
				>
					Watchlist
				</NavLink>
				<NavLink 
					to='/portfolio' 
					// className={setActive}
				>
					Portfolio
				</NavLink>
				{/* {!authorization ? <NavLink to='/login' className={setActive}>Login</NavLink> 
				: <button 
						className={styles.header__logout}
						onClick={() => logOut()}
					>
					{`Hi ${userName}! Logout`}
					</button>} */}
			</div>
		</div>

	)
}
