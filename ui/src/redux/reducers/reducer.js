const rds = (state={}, action) => {
  switch (action.type) {
    case 'SET_FETCHED_EVENTS':
    	return {...state, events: action.payload};
    case 'DESTROY_EVENTS':
    	const _omit = (obj, key) => {
    		delete obj[key];
    		return obj;
    	}
    	return _omit(state, 'events');
    default:
      return state;
  }
}

export default rds;
