import { useEffect } from 'react'
import { portfolioDataSelector } from '../../redux/selectors'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux'
import styles from './styles.module.css'
import { setPortfolioData } from '../../utilits'
import { updatePortfolioData } from '../../redux/portfolioData'


const ProcentBlock = ({children}: {children: number}) => {
    return children >= 0 
        ? <p className={`${styles.procent} ${styles.green}`}>{children}%</p>
        : <p className={`${styles.procent} ${styles.red}`}>{children}%</p>
}

export const PortfolioBalance = () => {
    
	const {portfolio} = useAppSelector(portfolioDataSelector);
	const {tokens} = useAppSelector(portfolioDataSelector)
	const dispatch = useAppDispatch();

	useEffect(() => {		
		const updatedData = setPortfolioData(tokens); // Данные в portfolio
		dispatch(updatePortfolioData(updatedData)) 
	}, [tokens, dispatch])
	
	return (
		<div className={styles.container}> 
			<div className={styles.balance}>
				<p className={styles.value}>${portfolio.currentBalance.toFixed(2)}</p>
				{/* <p className={styles.value}>${portfolio.currentBalance}</p> */}
				<ProcentBlock>{portfolio.profit.procent}</ProcentBlock>
			</div>
			<p className={styles.profit}>${portfolio.profit.value}</p>
		</div>
		// <pre>{JSON.stringify(portfolio)}</pre>
	)
}
