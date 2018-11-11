import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rds from './../redux/reducers/reducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger();
const middleware = applyMiddleware(thunk, logger);

export const store = createStore(rds, composeEnhancers(middleware));
