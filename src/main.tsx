import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
			<Provider store={store}>
				<PersistGate loading={<p>...loading...</p>} persistor={persistor}>
					<App />
				</PersistGate> 
				</Provider>
		</BrowserRouter>
  </React.StrictMode>,
)
