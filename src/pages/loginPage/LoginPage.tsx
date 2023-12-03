import { Link } from "react-router-dom"
import { LoginForm } from "../../components/ui/loginForm"
import { useAppDispatch } from "../../shared/hooks/useRedux"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../redux";

export const LoginPage = () => {
	
	const dispatch = useAppDispatch();

	const handleLogin = (email: string, password: string) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			console.log(user);
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
			<h1>Login</h1>
			<LoginForm handleLogin={handleLogin}/>
			<p>Or <Link to={'/signup'}>Register</Link></p>
		</div>
	)
}