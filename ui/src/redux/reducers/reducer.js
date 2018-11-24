const _omit = (obj, key) => {
  delete obj[key];
  return obj;
}


const rds = (state={}, action) => {
  switch (action.type) {
    case 'SET_FETCHED_EVENTS':
    	return {...state, events: action.payload};
    case 'DESTROY_EVENTS':
    	return _omit(state, 'events');
    case 'SET_REGISTER_RETURN_CODE':
      return {...state, successRegister: action.payload};
    case 'UNSET_DB_ERROR':
      return {...state, successRegister: true};
    case 'SET_FETCHED_WARDS':
      return {...state, wards: action.payload};
    default:
      return state;
  }
}

export default rds;
