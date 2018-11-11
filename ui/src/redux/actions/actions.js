import * as api from '../../utils/api.js';


const setFetchedEvents = (response) => {
  return {
    type: 'SET_FETCHED_EVENTS',
    payload: response,
  }
}


export const setEventsDestroyed = () => {
	return {
		type: 'DESTROY_EVENTS'
	}
}

export const destroyEvents = () => {
	return (dispatch) => {
		dispatch(setEventsDestroyed());
	}
}

export const fetchEvents = () => {
  return (dispatch) => {
    api.makeGetRequest('https://jsonplaceholder.typicode.com/users').then((response) => {
    	let data = response.data;
      dispatch(setFetchedEvents(data));
    }, (error) => {
      dispatch(console.log(error));
    });
  }
}
