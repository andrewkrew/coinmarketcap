// import { useLocation, useNavigate } from "react-router-dom"
// import styles from './styles.module.css'
// import { useAppDispatch, useAppSelector } from "../../shared/hooks/useRedux";
// import { authSelector, themeSelector } from "../../redux/selectors";
// import { loginThunk } from "../../redux";
// import { useEffect, useState } from "react";
// import { IconEye, IconEyeClosed } from '@tabler/icons-react';
// import { LinkBtn } from "../../components/ui/linkBtn";

import { Link } from "react-router-dom"
import { LoginForm } from "../../components/ui/loginForm"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../../shared/hooks/useRedux";
import { setUser } from "../../redux";

export const SignUpPage = () => {
	
	const dispatch = useAppDispatch() 

	const handleLogin = (email: string, password: string) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				dispatch(setUser({
					authorization: true,
					email: user.email,
					id: user.uid,
					// accessToken: user.accessToken,
					refreshToken: user.refreshToken,
				}))
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode);
				console.log(errorMessage);
				dispatch(setUser({
					error: errorMessage,
				}))
			});
	}

	return (
		<div>
			<h1>Sign up</h1>
			<LoginForm handleLogin={handleLogin}/>
			<p>Already have an account? <Link to={'/login'}>Login</Link></p>
		</div>
	)

	// const location = useLocation();
	// const navigate = useNavigate();
	// const {theme} = useAppSelector(themeSelector);
	// const {authorization, error} = useAppSelector(authSelector)
	// const dispatch = useAppDispatch();

	// const [isAuth, setIsAuth] = useState(false);
	// const [passwordType, setPasswordType] = useState('password');

	// const fromPage = location?.state?.from?.pathname || '/';	

	// useEffect(() => {
	// 	if (authorization) {
	// 		navigate(fromPage, {replace: true});
	// 	}
	// }, [authorization, navigate, fromPage])

	// const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

	// 	event.preventDefault();

	// 	const formData = new FormData(event.currentTarget);
	// 	const login = formData.get('login')?.toString();
	// 	const password = formData.get('password')?.toString();
		
	// 	if (login && password) {
	// 		dispatch(loginThunk({login, password}));
	// 	}
	// 	setIsAuth(true);
	// }

	// const toggleType = () => {
	// 	(passwordType === 'password') ? setPasswordType('text') : setPasswordType('password')
	// }

	// return (
	// <section className={theme === 'light' ? styles.login : `${styles.login} ${styles.login_dark}`}>
	// 	<div className={`wrapper ${styles.wrapper}`}>
	// 		<h1 className={styles.login__title}>Login</h1>	
	// 		<form className={styles.login__form} onSubmit={handleSubmit}>
	// 			<label htmlFor="login">
	// 				Login
	// 				<input 
	// 					name="login" 
	// 					placeholder="input your login" 
	// 					id="login" 
	// 					className={styles.login__login}
	// 				/>
	// 			</label>
				
	// 			<label htmlFor="password">
	// 				Password
	// 				<div className={styles.login__password}>
	// 					<input 
	// 						name="password" 
	// 						type={passwordType} 
	// 						placeholder="input your password" 
	// 						id="password"
	// 						className={styles.login__passwordInput}
	// 					/>
	// 					<div onClick={toggleType} className={styles.login__eye}>
	// 					{
	// 						passwordType === 'text' 
	// 						? <IconEye/>
	// 						: <IconEyeClosed/>
	// 					}
	// 					</div>
	// 				</div>
	// 			</label>
	// 			<LinkBtn>Login</LinkBtn>
	// 		</form>
	// 		{error && isAuth ? <p className={styles.login__message}>Something went wrong! Try again</p> : ''}
	// 	</div>
	// </section>
	// )
}