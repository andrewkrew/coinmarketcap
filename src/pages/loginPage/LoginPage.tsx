import { Link } from "react-router-dom"
import { LoginForm } from "../../components/ui/loginForm"
import { useAppDispatch } from "../../shared/hooks/useRedux"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser, showMessage } from "../../redux";
import styles from './styles.module.css'
import { SnackbarError } from "../../components/ui/snackbarError";

export const LoginPage = () => {
	
	const dispatch = useAppDispatch();

	const handleLogin = (email: string, password: string) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
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
			dispatch(setUser({
				error: errorMessage,
			}))
			dispatch(showMessage(errorCode))
		});
	}

	return (
		<section className={`wrapper ${styles.login}`}>
			<h1 className={styles.header}>Login</h1>
			<LoginForm handleLogin={handleLogin}/>
			<p className={styles.redirect}>Or <Link to={'/signup'}>Register</Link> on site</p>
			<SnackbarError/>
		</section>
	)
}