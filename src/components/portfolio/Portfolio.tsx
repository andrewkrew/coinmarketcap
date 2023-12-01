import { useEffect } from "react";
import { portfolioCurrancySelector, portfolioDataSelector } from "../../redux/selectors";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/useRedux";
import { BestWorstInvest } from "../bestWorstInvest";
import { PortfolioAssets } from "../portfolioAssets";
import { PortfolioBalance } from "../portfolioBalance";
import { PortfolioDonut } from "../portfolioDonut";
import { PortfolioTimeseries } from "../portfolioTimeseries";
import styles from './styles.module.css'
import { fetchPortfolioCurrencyThunk } from "../../redux/portfolioCurrency";
import { updateTokens } from "../../redux/portfolioData";
import { findBestInvest, findWhorstInvest, getUniqTokensId, setPortfolioTokens, setPortfolioUpdateData } from "../../utilits";
import { ModalWindow } from "../ui/modalWindow";
import { AddTransactionMenu } from "../addTransactionMenu";


export const Portfolio = () => {
	
	const dispatch = useAppDispatch();
	const {isLoading, portfolioCurrencyData, error} = useAppSelector(portfolioCurrancySelector);
	// const {portfolioCurrencyData} = useAppSelector(portfolioCurrancySelector);
	const {tokens, transactions} = useAppSelector(portfolioDataSelector)

//--------------------------------Сделать кастомный хук-----------------------------

	useEffect(() => {
		console.log('1');
		dispatch(fetchPortfolioCurrencyThunk(setPortfolioUpdateData(getUniqTokensId(transactions))))
	}, [dispatch, transactions])

	useEffect(() => {			
		if (Object.keys(portfolioCurrencyData).length && !isLoading) {			
			const updatedTokens = setPortfolioTokens(portfolioCurrencyData, transactions);
			dispatch(updateTokens(updatedTokens));
		}
	}, [dispatch, portfolioCurrencyData, isLoading])

	if (tokens.length === 0 || !tokens) {
		return (
			<div>
				<p>You have no yet any assets. Please add your first transaction!</p>
				<ModalWindow btnValue="Add transaction"><AddTransactionMenu/></ModalWindow>
				<p>{error}</p>
			</div>
		)
	} 
	
	return (
		<>{!tokens.length 
			? 
			<div>
					<p>You have no yet any assets. Please add your first transaction!</p>
					<ModalWindow btnValue="Add transaction"><AddTransactionMenu/></ModalWindow>
			</div> 
			: 
			<div className={styles.wrapper}>
				<section className={styles.header}>
					<h1 className={styles.title}>Your Portfolio</h1>
				</section>
				<section className={styles.balance}>
					<PortfolioBalance/>
					<ModalWindow btnValue="Add transaction"><AddTransactionMenu/></ModalWindow>
				</section>
				<section className={styles.analytics}>
					<PortfolioTimeseries/>
					{/* <PortfolioDonut/> */}
					<div style={{width: '600px', height: '400px'}}>
						<PortfolioDonut/>
					</div>
					<div className={styles.invest}>
						<BestWorstInvest token={findBestInvest(tokens)}>Best Invest</BestWorstInvest>
						<BestWorstInvest token={findWhorstInvest(tokens)}>Whorst Invest</BestWorstInvest>
					</div>
				</section>
				<section>
					<h2>Your Assets</h2>
					<PortfolioAssets/>
				</section>
		</div>
	}</>
	)
}