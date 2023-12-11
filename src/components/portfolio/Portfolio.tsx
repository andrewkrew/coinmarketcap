import { useEffect } from "react";
import { authSelector, portfolioCurrancySelector, portfolioDataSelector } from "../../redux/selectors";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/useRedux";
import { BestWorstInvest } from "../bestWorstInvest";
import { PortfolioAssets } from "../portfolioAssets";
import { PortfolioBalance } from "../portfolioBalance";
import { PortfolioDonut } from "../portfolioDonut";
import styles from './styles.module.css'
import { fetchPortfolioCurrencyThunk } from "../../redux/portfolioCurrency";
import { updateTokens } from "../../redux/portfolioData";
import { findBestInvest, findWhorstInvest, getUniqTokensId, setPortfolioTokens, setPortfolioUpdateData } from "../../utilits";
import { ModalWindow } from "../ui/modalWindow";
import { AddTransactionMenu } from "../addTransactionMenu";
import { SnackbarSuccess } from "../ui/snackbarSuccess";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";


export const Portfolio = () => {
	
	const dispatch = useAppDispatch();
	const {isLoading, portfolioCurrencyData, error} = useAppSelector(portfolioCurrancySelector);
	const {tokens, transactions} = useAppSelector(portfolioDataSelector)
	const {authorization, id} = useAppSelector(authSelector)

	useEffect(() => {
		dispatch(fetchPortfolioCurrencyThunk(setPortfolioUpdateData(getUniqTokensId(transactions))))
	}, [dispatch, transactions, authorization, id])

	useEffect(() => {			
		if (Object.keys(portfolioCurrencyData).length && !isLoading) {			
			const updatedTokens = setPortfolioTokens(portfolioCurrencyData, transactions);
			dispatch(updateTokens(updatedTokens));
		}
	}, [dispatch, portfolioCurrencyData, isLoading])

	useEffect(() => {
		if (authorization && Object.keys(portfolioCurrencyData).length && !isLoading) {
			const coinRef = doc(db, "transactions", id);
			const unsubscribe = onSnapshot(coinRef, (trans) => {
				if (trans.exists()) {
					const updatedTokens = setPortfolioTokens(portfolioCurrencyData, trans.data().transactions);
					dispatch(updateTokens(updatedTokens));
				}
			});

			return () => {
				unsubscribe();
			};
		}
	}, [authorization, id, dispatch, portfolioCurrencyData, isLoading]);



	if (tokens.length === 0 || !tokens) {
		return (
			<div className={`wrapper ${styles.notTransaction}`}>
				<h2 className={styles.notTransaction__info}>You have no yet any assets. Please add your first transaction!</h2>
				<ModalWindow btnValue="Add transaction" type="add"><AddTransactionMenu/></ModalWindow>
				{!error?.length && <p>error</p>}
			</div>
		)
	} 
	
	return (
		<div className={`wrapper ${styles.wrapper}`}>
			<section className={styles.header}>
				<h1 className={styles.title}>Your portfolio</h1>
			</section>
			<section className={styles.balance}>
				<PortfolioBalance/>
				<ModalWindow btnValue="Add transaction" type="add"><AddTransactionMenu/></ModalWindow>
			</section>
			<section className={styles.analytics}>
				<div className={styles.donut}>
					<PortfolioDonut/>
				</div>
				<div className={styles.invest}>
					<BestWorstInvest token={findBestInvest(tokens)}>Best Invest</BestWorstInvest>
					<BestWorstInvest token={findWhorstInvest(tokens)}>Whorst Invest</BestWorstInvest>
				</div>
			</section>
			<section className={styles.assets}>
				<h2 className={styles.assets__title}>Your Assets</h2>
				<PortfolioAssets/>
			</section>
			<SnackbarSuccess/>
		</div>
	)
}