import { useAppSelector } from '../../shared/hooks/useRedux';
import { portfolioDataSelector } from '../../redux/selectors';
import { ModalWindow } from '../ui/modalWindow';
import { AddTransactionMenu } from '../addTransactionMenu';
import { ModalAlert } from '../ui/modalAlert';
import styles from './styles.module.css'
import { PriceIndicator } from '../priceIndicator';
import { TransactionsData } from '../transactionsData';
import { TransactionsPortfolioData } from '../../shared/api/types';

export const TransactionsMenu = ({tokenTransInfoId} : {tokenTransInfoId: string}) => {
	
	const {transactions, tokens} = useAppSelector(portfolioDataSelector)
	const token = tokens.find(item => item.id === tokenTransInfoId);
	
	if (!tokenTransInfoId) return <p>Plese, select a token</p>
	else if (!token) return <p>List of transactions is empty</p>

	else {
		return (
			<> 
				<h3 className={styles.token__title}>{token.name} ({token.symbol.toUpperCase()}) Balance</h3>
				<div className={styles.token__info}>
					<div className={styles.token__priceBlock}>
						<img className={styles.token__img} src={token.image} alt={token.name} />
						<p className={styles.token__price}>$ {token.currentBalance}</p>
						<div className={styles.token__procent}>
							<PriceIndicator>{token.profit24h?.procent}</PriceIndicator>
						</div>
					</div>
					<div className={styles.token__buttons}>
						<ModalWindow btnValue="Add transaction" type='add'>
							<AddTransactionMenu/>
						</ModalWindow>
						<div className={styles.token__alert}>
							<ModalAlert 
								btnValue={'Delete all transactions'}
								removeType={'all'}
								idToken={token.id}>
								Are you sure you want to delete all transactions?
							</ModalAlert>
						</div>
					</div>
				</div>
				<div className={styles.token__data}>
					<p>Quantity</p>
					<p>Avg. buy price</p>
					<p>Total profit / loss</p>
					<p>{token.currentTokens} {token.symbol.toUpperCase()}</p>
					<p>$ {token.averagePrice}</p>
					<div className={styles.token__profit}>
						<PriceIndicator>{token.profit.procent}</PriceIndicator>
						<p>{`($ ${token.profit.value})`}</p>
					</div>
				</div>
				<h3 className={styles.token__title}>Transactions</h3>
				<div className={styles.trans__container}>
					<p className={styles.trans__type}>Type</p>
					<p className={styles.trans__price}>Price</p>
					<p className={styles.trans__amount}>Amount</p>
					<p className={styles.trans__actions}>Actions</p>
					{transactions.filter(item => item.tokenId === tokenTransInfoId)
					.map((item :TransactionsPortfolioData) => {
						return <TransactionsData key={item.id} {...item}/>
					})}
				</div>
			</>
		)
	}
}