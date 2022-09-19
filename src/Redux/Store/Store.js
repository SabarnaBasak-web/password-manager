import createSagaMiddleware from '@redux-saga/core';
import { configureStore} from '@reduxjs/toolkit'
import passwordSlice from '../Reducers/passwordSlice'; 
import saga from '../Saga/firebaseSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {passwordSlice},
  middleware
});

sagaMiddleware.run(saga);


