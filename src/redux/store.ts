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
// import { authReducer, themeReducer, coinsReducer } from '.'
import { coinsReducer } from '.'
import { portfolioCurrencyReducer } from './portfolioCurrency'
import { portfolioDataReducer } from './portfolioData'
import { themeToggleReducer } from './theme'

const rootStore = combineReducers({
	// auth: authReducer,
	theme: themeToggleReducer,
	coins: coinsReducer,
	portfolioCurrency: portfolioCurrencyReducer,
	portfolioData: portfolioDataReducer,
})

const persistConfig = {
  key: 'root',
	storage,
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