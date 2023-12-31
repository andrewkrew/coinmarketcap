import styles from './styles.module.css'

export const PriceIndicator = ({children}: {children: number}) => {
	return (
		<p className={`${+children >= 0 ? styles.green : styles.red}`}>
			<span>
				<svg xmlns="http://www.w3.org/2000/svg" className={styles.array} fill="currentColor" height="14px" width="14px" viewBox="0 0 24 24" >
					<path d="M18.0566 8H5.94336C5.10459 8 4.68455 9.02183 5.27763 9.61943L11.3343 15.7222C11.7019 16.0926 12.2981 16.0926 12.6657 15.7222L18.7223 9.61943C19.3155 9.02183 18.8954 8 18.0566 8Z">
					</path>
				</svg>
			</span>
			{children}%
		</p>
	)
}