import styles from './styles.module.css'

export const BurgerBtn = ({isActive, setIsActive} : {isActive: boolean, setIsActive: (prev: boolean) => void}) => {

	const toggleClass = (): void => setIsActive(!isActive);

	return (
		<div 
			className={`${styles.button__burger} ${isActive ? styles.active : ''}`}
			onClick={toggleClass}
		>
			<div className={styles.button}>
				<span className={`${styles.row} ${styles.first__row}`}></span>
				<span className={`${styles.row} ${styles.second__row}`}></span>
				<span className={`${styles.row} ${styles.third__row}`}></span>
			</div>
		</div>
	)
}