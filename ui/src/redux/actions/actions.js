import * as api from '../../utils/api.js';


const setFetchedEvents = (response) => {
  return {
    type: 'SET_FETCHED_EVENTS',
    payload: response,
  }
}

export const fetchEvents = () => {
  return (dispatch) => {
    api.makeGetRequest('https://jsonplaceholder.typicode.com/todos/1').then((response) => {
    	let data = response.data;
      dispatch(setFetchedEvents(data));
    }, (error) => {
      dispatch(console.log(error));
    });
  }
}
