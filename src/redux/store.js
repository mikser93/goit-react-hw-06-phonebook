import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { itemsReducer } from './itemsSlice';
import { filterReducer } from './filterSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['items'],
};

const rootReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});

const persistedItemsReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedItemsReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
