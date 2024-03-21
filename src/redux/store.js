import { configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { buyReducer } from './buy/buy.reducer';
import { filterReducer } from './filter/filter.reducer';
import { authReducer } from './auth/auth.reducer';
import { homeIdReducer } from './homeId/homeId.reducer';
import { rentReducer } from './rent/rent.reducer';

const buyConfig = {
  key: 'homes',
  storage,
  whitelist: ['homes'],
};

const rentConfig = {
  key: 'rentHomes',
  storage,
  whitelist: ['rentHomes'],
};

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const homeIdConfig = {
  key: 'homes/homeId',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    buyStore: persistReducer(buyConfig, buyReducer),
    rentStore: persistReducer(rentConfig, rentReducer),

    filterStore: filterReducer,
    filterResults: filterReducer,
    homeIdStore: persistReducer(homeIdConfig, homeIdReducer),
    auth: persistReducer(authConfig, authReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
