import { useEffect, useState } from "react";
import { portfolioCurrancySelector, portfolioDataSelector } from "../../redux/selectors";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/useRedux";
import { AddTransactionMenu } from "../addTransactionMenu";
import { BestWorstInvest } from "../bestWorstInvest";
import { PortfolioAssets } from "../portfolioAssets";
import { PortfolioBalance } from "../portfolioBalance";
import { PortfolioDonut } from "../portfolioDonut";
import { PortfolioTimeseries } from "../portfolioTimeseries";
import { TransactionsMenu } from "../transactionsMenu";
import styles from './styles.module.css'
import { fetchPortfolioCurrencyThunk } from "../../redux/portfolioCurrency";
import { updateTokens } from "../../redux/portfolioData";
import { findBestInvest, findWhorstInvest, getUniqTokensId, setPortfolioTokens, setPortfolioUpdateData } from "../../utilits";


export const Portfolio = () => {
	
	const dispatch = useAppDispatch();
	const {isLoading, portfolioCurrencyData, error} = useAppSelector(portfolioCurrancySelector);
	// const {portfolioCurrencyData} = useAppSelector(portfolioCurrancySelector);
	const {tokens, transactions} = useAppSelector(portfolioDataSelector)
	const [tokenTransInfoId, setTokenTransInfoId] = useState<string>('');

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
				<button className={styles.button}>Add transaction</button>
				<AddTransactionMenu/>
				<p>{error}</p>
			</div>
		)
	} 
	
	return (
		<>{!tokens.length 
			? 
			<div>
					<p>You have no yet any assets. Please add your first transaction!</p>
					<button className={styles.button}>Add transaction</button>
					<AddTransactionMenu/>
			</div> 
			: 
			<div className={styles.wrapper}>
				<section className={styles.header}>
					<h1 className={styles.title}>Your Portfolio</h1>
					<button className={styles.button}>Add transaction</button>
				</section>
				<section className={styles.balance}>
					<PortfolioBalance/>
					<div className={styles.invest}>
						<BestWorstInvest token={findBestInvest(tokens)}>Best Invest</BestWorstInvest>
						<BestWorstInvest token={findWhorstInvest(tokens)}>Whorst Invest</BestWorstInvest>
					</div>
				</section>
				<section>
					<PortfolioTimeseries/>
					{/* <PortfolioDonut/> */}
					<div style={{width: '600px', height: '400px'}}>
						<PortfolioDonut/>
					</div>
				</section>
				<section>
					<h2>Your Assets</h2>
					<PortfolioAssets 
						setTokenTransInfoId={setTokenTransInfoId}
					/>
				</section>
				<div>
					<h2>TRANSACTIONS</h2>
					<TransactionsMenu tokenTransInfoId={tokenTransInfoId} />
				</div>
				<div>
					<h2>ADD TRANSACTION MENU</h2>
					<AddTransactionMenu/>
				</div> 
		</div>
	}</>
	)
}