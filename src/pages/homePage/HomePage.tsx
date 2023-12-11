import styles from './styles.module.css'
import { useAppSelector } from "../../shared/hooks/useRedux"
import { themeSelector } from "../../redux/selectors"
import { useScrollTop } from "../../shared/hooks/useScrolltop";
import { MainBtn } from "../../components/ui/mainBtn";
import { Link } from 'react-router-dom';

export const HomePage = () => {

	const {theme} = useAppSelector(themeSelector);
	useScrollTop();

	return (
		<>
			{/* <section className={theme === 'light' ? styles.home : `${styles.home} ${styles.home_dark}`}> */}
			<section className={styles.banner}>
				<video autoPlay muted loop 
					className={styles.video}
					src="https://www.cryptobaseatm.com/wp-content/uploads/CRYPTOBASE_LOOP_V4.mp4">
				</video>
				<div className={theme === 'light' ? styles.video__mask : `${styles.video__mask} ${styles.video__mask_dark}`}></div>
				<div className={`wrapper ${styles.wrapper}`}>
					<div className={styles.banner__info}>
						<h1 className={styles.banner__title}>Start building your cryptocurrency portfolio</h1>
						<MainBtn>
							<Link className={styles.banner__mainLink} to='/portfolio'>Start building your portfolio</Link>
						</MainBtn>
						<p className={styles.banner__desc}>
							Coinmarketcap — the most convenient platform for buying and selling cryptocurrency. Register and get started today.
						</p>
					</div>
				</div>
			</section>

			<section className={`wrapper ${styles.about}`}>
				<div className={styles.infoBlock}>
					<h3 className={styles.infoBlock__title}>Buy, store, send and swap tokens</h3>
					<p className={styles.infoBlock__desc}>Available as a browser extension and as a mobile app, MetaMask equips you with a key vault, secure login, token wallet, and token exchange—everything you need to manage your digital assets.
					</p>
					<div className={`${styles.aboutBackground} ${styles.aboutBackground_1}`}></div>
				</div>
				<div className={styles.infoBlock}>			
					<h3 className={styles.infoBlock__title}>Buy, store, send and swap tokens</h3>
					<p className={styles.infoBlock__desc}>MetaMask provides the simplest yet most secure way to connect to blockchain-based applications. You are always in control when interacting on the new decentralized web.
					</p>
					<div className={`${styles.aboutBackground} ${styles.aboutBackground_2}`}></div>
				</div>
				<div className={styles.infoBlock}>			
					<h3 className={styles.infoBlock__title}>Own your data</h3>
					<p className={styles.infoBlock__desc}>MetaMask generates passwords and keys on your device, so only you have access to your accounts and data. You always choose what to share and what to keep private.
					</p>
					<div className={`${styles.aboutBackground} ${styles.aboutBackground_3}`}></div>
				</div>
			</section>
		</>
	)
}