import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/useRedux"
import { authSelector } from "../../../redux/selectors"
import styles from './styles.module.css'
import { removeUser } from "../../../redux"
import { MainBtn } from "../mainBtn"
import { SecondaryBtn } from "../secondaryBtn"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Tooltip } from "@mui/material"

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
			{!authorization 
			? <div className={styles.header__login}>
					<SecondaryBtn>
						<Link to='/login'>Log In</Link>
					</SecondaryBtn>
					<MainBtn>
						<Link to='/signup'>Sign Up</Link>
					</MainBtn>
				</div> 
			: <div className={styles.header__logout}>
					<Tooltip title={`Hi, ${email}!`} arrow>
						<AccountCircleIcon fontSize="large" className={styles.header__icon}/>
					</Tooltip>
					<Box onClick={() => logOut()}>
						<SecondaryBtn>LogOut</SecondaryBtn>
					</Box>
				</div>
			}
		</div>
	)
}
