import { combineReducers } from 'redux';
import panelReducer from './panelReducer.js';

const reducer = combineReducers({test: panelReducer})

export default reducer;
