import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/useRedux"
import { authSelector } from "../../../redux/selectors"
import styles from './styles.module.css'
import { removeUser } from "../../../redux"

export const AuthBtn = () => {
	
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const logOut = () => {
		dispatch(removeUser());
		navigate('/', {replace: true});
	}

	const {authorization, email} = useAppSelector(authSelector);
	
	return (
		<div>
			{!authorization ? <Link to='/login'>Login</Link> 
			: <div 
					className={styles.header__logout}
					onClick={() => logOut()}
				>
				<div>IMG</div>
				{`Hi ${email}! Logout`}
				</div>}
		</div>
		// <p><Link to={'/login'}>Login</Link></p>
	)
}
