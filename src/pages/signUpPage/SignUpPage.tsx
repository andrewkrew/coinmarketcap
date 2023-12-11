import { Link } from "react-router-dom"
import { LoginForm } from "../../components/ui/loginForm"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../../shared/hooks/useRedux";
import { setUser, showMessage } from "../../redux";
import styles from './styles.module.css'
import { SnackbarError } from "../../components/ui/snackbarError";

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
			dispatch(showMessage(errorCode))
			});
	}

	return (
		<section className={`wrapper ${styles.login}`}>
			<h1 className={styles.header}>Sign up</h1>
			<LoginForm handleLogin={handleLogin}/>
			<p>Already have an account? <Link to={'/login'}>Login</Link></p>
			<SnackbarError/>
		</section>
	)
}