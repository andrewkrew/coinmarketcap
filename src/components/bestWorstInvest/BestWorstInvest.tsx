import { TokensPortfolioData } from '../../shared/api/types'
import styles from './styles.module.css'

export const BestWorstInvest = ({token, children}: {token: TokensPortfolioData, children: string}) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{children}</h3> 
            <img className={styles.photo} src={token.image} alt={token.name}/>
            <h4 className={styles.coinName}>{token.name}</h4>
            <div>
                <p className={styles.procent}>{token.profit.procent}%</p>
                <p className={styles.value}>{token.profit.value}</p>
            </div>
        </div>
    )
}