import { TransactionsPortfolioData } from '../../shared/api/types';
import { ModalAlert } from '../ui/modalAlert'
import styles from './styles.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SellIcon from '@mui/icons-material/Sell';

export const TransactionsData = (item: TransactionsPortfolioData) => {
	return <>
		<div className={styles.trans__type}>
			<div className={styles.trans__icon}>
				{item.type === 'buy' ? <ShoppingBasketIcon/> : <SellIcon/>}
			</div>
			<p>{item.type.toUpperCase()}</p>
			<p className={styles.trans__date}>{item.date}</p>
		</div>
		<p className={styles.trans__price}>$ {item.price}</p>
		{item.type === 'buy' 
		? <div className={styles.trans__amount}>
			<p>$ -{item.totalCostTransaction?.toFixed(2)}</p>
			<p>+{item.totalTokens} {item?.symbol}</p>
		</div> 
		: <div className={styles.trans__amount}>
			<p>$ +{-item.totalCostTransaction?.toFixed(2)}</p>
			<p>{item.totalTokens} {item?.symbol}</p>
		</div> 
		}
		<div className={styles.trans__actions}>
			<ModalAlert 
				btnValue={<DeleteForeverIcon/>}
				removeType='id'
				idTsx={item.id}>
				Are you sure you want to delete this transaction?
			</ModalAlert>
		</div>
	</>
}