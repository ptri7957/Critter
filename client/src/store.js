import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const initialState = {}

const middleware = [thunk];

export default createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)