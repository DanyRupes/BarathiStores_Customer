import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//import logger from 'redux-logger';
import {createLogger} from 'redux-logger';

import rootReducer from './reducers';

const initialstate = {};
const log = createLogger({ diff:true, collapsed:true});
const middleware = [thunk,log];

const store = createStore( rootReducer, initialstate, applyMiddleware(...middleware)
 );



export default store;