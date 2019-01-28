import { AsyncStorage } from 'react-native';
import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import { PersistConfig, Persistor } from 'redux-persist/es/types';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from './reducers';
import middlewares from './middlewares';

export const persistConfig: PersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [

  ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(onComplete: () => void): {store: Store<any, AnyAction>, persistor: Persistor} {
  const store = createStore(
    persistedReducer,
    undefined,
    applyMiddleware(...middlewares)
  );
  const persistor = persistStore(store, {}, onComplete);

  return {store, persistor}
};
