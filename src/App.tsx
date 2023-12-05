import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/homePage/HomePage';
import { NotFound } from './pages/notFoundPage/NotFound';
import { CurrenciesPage } from './pages/currenciesPage/CurrenciesPage';
import { CurrencyInfoPage } from './pages/currencyInfoPage/CurrencyInfoPage';
import { ExchangesPage } from './pages/exchangesPage/ExchangesPage';
import { PrivateRoute } from './pages/private/PrivateRoute';
import { PortfolioPage } from './pages/portfolioPage/PortfolioPage';
import { useAppSelector } from './shared/hooks/useRedux';
import { themeSelector } from './redux/selectors';
import { useLayoutEffect } from 'react';
import { LoginPage } from './pages/loginPage';
import { SignUpPage } from './pages/signUpPage/SignUpPage';
import { ExchangeInfoPage } from './pages/exchangeInfoPage/ExchangeInfoPage';
import './firebase'
import { useOffsetY } from './shared/hooks/useOffsetY';


export const App = () => {

	const {theme} = useAppSelector(themeSelector);
	const {offsetY, setOffsetY} = useOffsetY();

	useLayoutEffect(() => {
		const document = window.document.documentElement;
		document.setAttribute('data-theme', theme);
	}, [theme])


  return (
    <>
			<Routes>
				<Route path='/' element={<Layout/>}>
					<Route index element={<HomePage/>}/>
					<Route path='login' element={<LoginPage/>}/>
					<Route path='signup' element={<SignUpPage/>}/>
					<Route path='currencies' element={<CurrenciesPage offsetY={offsetY} setOffsetY={setOffsetY}/>}/>
					<Route path='currencies/:coinId' element={<CurrencyInfoPage/>}/>
					<Route path='exchanges' element={<ExchangesPage offsetY={offsetY} setOffsetY={setOffsetY}/>}/>
					<Route path='exchanges/:exchangeId' element={<ExchangeInfoPage/>}/>
					<Route element={<PrivateRoute/>}>
						<Route path='portfolio'element={<PortfolioPage/>}/>
					</Route>
				</Route>
				<Route path='*' element={<NotFound/>}/>
			</Routes>
    </>
  )
}

export default App
