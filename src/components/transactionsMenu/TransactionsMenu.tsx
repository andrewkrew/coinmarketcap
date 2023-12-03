import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppSelector } from '../../shared/hooks/useRedux';
import { portfolioDataSelector } from '../../redux/selectors';
import { ModalWindow } from '../ui/modalWindow';
import { AddTransactionMenu } from '../addTransactionMenu';
import { ModalAlert } from '../ui/modalAlert';

export const TransactionsMenu = ({tokenTransInfoId} : {tokenTransInfoId: string}) => {
	
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
					<ModalAlert 
						btnValue={'Delete all transactions'}
						removeType={'all'}
						idToken={token.id}>
						Are you sure you want to delete all transaction?
					</ModalAlert>
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
									<ModalAlert 
										btnValue={<DeleteForeverIcon/>}
										removeType='id'
										idTsx={item.id}>
										Are you sure you want to delete this transaction?
									</ModalAlert>
								</div>
							})
					}
				</div>
			</>
		)
	}
}