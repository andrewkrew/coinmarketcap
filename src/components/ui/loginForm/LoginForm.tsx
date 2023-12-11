import { useLocation, useNavigate } from "react-router-dom"
import styles from './styles.module.css'
import { useEffect, useState } from "react";
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import { useAppSelector } from "../../../shared/hooks/useRedux";
import { authSelector } from "../../../redux/selectors";
// import { loginThunk } from "../../../redux";
import { Box } from "@mui/material";
import { MainBtn } from "../mainBtn";

export const LoginForm = ({handleLogin}: {handleLogin: (email: string, password: string) => void}) => {
	
	const location = useLocation();
	const navigate = useNavigate();
	const {authorization, error} = useAppSelector(authSelector)
	// const dispatch = useAppDispatch();

	const [isAuth, setIsAuth] = useState(false);
	const [passwordType, setPasswordType] = useState('password');

	const fromPage = location?.state?.from?.pathname || '/';	

	useEffect(() => {
		if (authorization) {
			navigate(fromPage, {replace: true});
		}
	}, [authorization, navigate, fromPage])

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();
		
		if (email && password) {
			// dispatch(loginThunk({login, password}));
			handleLogin(email, password);
			console.log(email);
			console.log(password);
			
			
		}
		setIsAuth(true);
	}

	const toggleType = () => {
		(passwordType === 'password') ? setPasswordType('text') : setPasswordType('password')
	}

	return (
	<section className={styles.login}>
		<div className={`wrapper ${styles.wrapper}`}>
			<form className={styles.login__form} onSubmit={handleSubmit}>
				<label htmlFor="email">
					Email
					<input 
						type="email"
						name="email" 
						placeholder="input your email" 
						id="email" 
						className={styles.login__login}
					/>
				</label>

				<label htmlFor="password">
					Password
					<div className={styles.login__password}>
						<input 
							name="password" 
							type={passwordType} 
							placeholder="input your password" 
							id="password"
							className={styles.login__passwordInput}
						/>
						<div onClick={toggleType} className={styles.login__eye}>
						{
							passwordType === 'text' 
							? <IconEye/>
							: <IconEyeClosed/>
						}
						</div>
					</div>
				</label>
				<Box onClick={() => handleSubmit}>
					<MainBtn>Submit</MainBtn>
				</Box>
			</form>
			{error && isAuth ? <p className={styles.login__message}>Something went wrong! Try again</p> : ''}
		</div>
	</section>
	)
}