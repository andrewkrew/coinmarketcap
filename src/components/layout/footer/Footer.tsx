import styles from './styles.module.css'

export const Footer = () => {
	
	return (
	<footer className={styles.footer}>
		<div className={`wrapper ${styles.container}`}>
			<p className={styles.copyright}>&copy; 2023 CoinMarketCap. All rights reserved</p>
		</div>
	</footer>
	)
}