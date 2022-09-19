import createSagaMiddleware from '@redux-saga/core';
import { configureStore} from '@reduxjs/toolkit'
import counterSlice from '../Reducers/counterSlice'; 
import saga from '../Saga/firebaseSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {counterSlice},
  middleware
});

sagaMiddleware.run(saga);


