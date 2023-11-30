import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/homePage/HomePage';
import { AuthPage } from './pages/authPage/AuthPage';
import { NotFound } from './pages/notFoundPage/NotFound';
import { CurrenciesPage } from './pages/currenciesPage/CurrenciesPage';
import { CurrencyInfoPage } from './pages/currencyInfoPage/CurrencyInfoPage';
import { ExchangesPage } from './pages/exchangesPage/ExchangesPage';
import { ExchangeInfoPage } from './pages/exchangeInfoPage/exchangeInfoPage';
import { PrivateRoute } from './pages/private/PrivateRoute';
import { WatchlistPage } from './pages/watchlistPage/WatchlistPage';
import { PortfolioPage } from './pages/portfolioPage/PortfolioPage';
import { useAppSelector } from './shared/hooks/useRedux';
import { themeSelector } from './redux/selectors';
import { useLayoutEffect } from 'react';

export const App = () => {

	const {theme} = useAppSelector(themeSelector);

	useLayoutEffect(() => {
		const document = window.document.documentElement;
		document.setAttribute('data-theme', theme);
	}, [theme])


  return (
    <>
			<Routes>
				<Route path='/' element={<Layout/>}>
					<Route index element={<HomePage/>}/>
					<Route path='login' element={<AuthPage/>}/>
					<Route path='currencies' element={<CurrenciesPage/>}/>
					<Route path='currencies/:coinId' element={<CurrencyInfoPage/>}/>
					<Route path='exchanges' element={<ExchangesPage/>}/>
					<Route path='exchanges/:ExxhangeId' element={<ExchangeInfoPage/>}/>
				</Route>
				<Route element={<PrivateRoute/>}>
					<Route path='watchlist'element={<WatchlistPage/>}/>
					<Route path='portfolio'element={<PortfolioPage/>}/>
				</Route>
				<Route path='*' element={<NotFound/>}/>
			</Routes>
    </>
  )
}

export default App
