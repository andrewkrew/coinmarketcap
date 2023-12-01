import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux';
import { portfolioDataSelector } from '../../redux/selectors';
import { removeAllTransactions, removeTransaction } from '../../redux/portfolioData';
import { ModalWindow } from '../ui/modalWindow';
import { AddTransactionMenu } from '../addTransactionMenu';

export const TransactionsMenu = ({tokenTransInfoId} : {tokenTransInfoId: string}) => {
	
	const dispatch = useAppDispatch();
	const {transactions, tokens} = useAppSelector(portfolioDataSelector)
	const token = tokens.find(item => item.id === tokenTransInfoId);
	
	if (!tokenTransInfoId) return <p>Plese, select a token</p>
	else if (!token) return <p>List of transactions is empty</p>

	else {
		return (
			<> 
				<h3>{token.id} Balance</h3>
				<div>
					<div>
						<img src={token.image} alt={token.name} />
						<p>{token.currentBalance}</p>
						<p>{token.profit24h?.procent}</p>
					</div>
					<ModalWindow btnValue="Add transaction"><AddTransactionMenu/></ModalWindow>
					<p>ADD CONFIRM</p>
					<button type='button' onClick={() => dispatch(removeAllTransactions(token.id))}>
						Delete all transactions
					</button>
				</div>
				<div>
					{/* grid */}
					<p>Quantity</p>
					<p>Avg. buy price</p>
					<p>Total profit / loss</p>
					<p>{token.currentBalance}</p>
					<p>{token.averagePrice}</p>
					<p>{`${token.profit.procent}% ($${token.profit.value})`}</p>
				</div>
				<div>
					{/* grid */}
					<p>Type</p>
					<p>Date</p>
					<p>Price</p>
					<p>Amount</p>
					<p>Delete</p>
				</div>
				<div>
					{
						transactions.filter(item => item.tokenId === tokenTransInfoId)
							.map(item => {
							return <div key={item.id}>
									<p>{item.type}</p>
									<p>{item.date}</p>
									<p>{item.price}</p>
									{item.type === 'buy' 
									? <div>
										<p>-$ {item.totalCostTransaction}</p>
										<p>+{token.symbol} {item.totalTokens}</p>
									</div> 
									: <div>
										<p>+$ {item.totalCostTransaction}</p>
										<p>-{token.symbol} {item.totalTokens}</p>
									</div> 
									}
									<p onClick={() => dispatch(removeTransaction(item.id))}>
										<DeleteForeverIcon/>
									</p>
								</div>
							})
					}
				</div>
			</>
		)
	}
	

}