import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit'
import passwordSlice from '../Reducers/passwordSlice';
import userSlice from '../Reducers/UserSlice';
import saga from '../Saga/RootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: { passwordSlice, userSlice },
  middleware
});

sagaMiddleware.run(saga);


