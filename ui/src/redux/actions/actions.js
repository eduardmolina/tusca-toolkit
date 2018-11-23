import * as api from '../../utils/api.js';


const setFetchedEvents = (response) => {
  return {
    type: 'SET_FETCHED_EVENTS',
    payload: response,
  }
}

const setRegisterReturnCode = (returnCode) => {
  return {
    type: 'SET_REGISTER_RETURN_CODE',
    payload: returnCode
  }
}

const unsetDBError = () => {
  return {
    type: 'UNSET_DB_ERROR'
  }
}


const setEventsDestroyed = () => {
	return {
		type: 'DESTROY_EVENTS'
	}
}

export const unsetError = () => {
  return (dispatch) => {
    dispatch(unsetDBError());
  }
}

export const destroyEvents = () => {
	return (dispatch) => {
		dispatch(setEventsDestroyed());
	}
}

export const register = (cpf, name, lastName) => {
  return (dispatch) => {
    api.makePostRequest('/api/v1/insert_wards',
      {
        cpf: cpf,
        name: name,
        lastName: lastName
      }).then((response) => {
      dispatch(setRegisterReturnCode(response.data.success))
    }, (error) => {
      console.log(error);
    });
  }
}

export const fetchEvents = () => {
  return (dispatch) => {
    api.makeGetRequest('https://jsonplaceholder.typicode.com/users').then((response) => {
    	let data = response.data;
      dispatch(setFetchedEvents(data));
    }, (error) => {
      console.log(error);
    });
  }
}
