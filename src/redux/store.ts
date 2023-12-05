import { persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer, candleReducer, coinsReducer, exchangesReducer, themeToggleReducer } from '.'
import { portfolioCurrencyReducer } from './portfolioCurrency'
import { portfolioDataReducer } from './portfolioData'
import { paginationReducer } from './pagination'

const rootStore = combineReducers({
	auth: authReducer,
	theme: themeToggleReducer,
	coins: coinsReducer,
	exchanges: exchangesReducer,
	portfolioCurrency: portfolioCurrencyReducer,
	portfolioData: portfolioDataReducer,
	candleData: candleReducer,
	pagination: paginationReducer,
})

const persistConfig = {
  key: 'root',
	storage,
	blacklist: ['pagination'],
};

const persistedReducer = persistReducer(persistConfig, rootStore)

export const store = configureStore({
	reducer: persistedReducer,
	devTools: true,
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;