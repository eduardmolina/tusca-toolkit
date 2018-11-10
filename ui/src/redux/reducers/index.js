import { combineReducers } from 'redux';
import rds from './reducer.js';

const reducer = combineReducers({'reducer': rds})

export default reducer;
