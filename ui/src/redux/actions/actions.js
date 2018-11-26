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

const setFetchedWards = (response) => {
  return {
    type: 'SET_FETCHED_WARDS',
    payload: response,
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

const setWardsDestroyed = () => {
  return {
    type: 'DESTROY_WARDS'
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

export const destroyWards = () => {
  return (dispatch) => {
    dispatch(setWardsDestroyed());
  }
}

export const register = (cpf, id, nurse, companion, diagnostic, date) => {
  return (dispatch) => {
    api.makePostRequest('/api/v1/insert_wards',
      {
        cpf: cpf,
        id: id,
        nurse: nurse,
        companion: companion,
        diagnostic: diagnostic,
        date: date
      }).then((response) => {
      dispatch(setRegisterReturnCode(response.data.success))
    }, (error) => {
      console.log(error);
    });
  }
}

export const fetchWards = () => {
  return (dispatch) => {
    api.makeGetRequest('/api/v1/search_wards').then((response) => {
      let data = response.data.data;
      dispatch(setFetchedWards(data));
    }, (error) => {
      console.log(error);
    })
  }
}

export const fetchEvents = () => {
  return (dispatch) => {
    api.makeGetRequest('/api/v1/search_events').then((response) => {
    	let data = response.data.data;
      dispatch(setFetchedEvents(data));
    }, (error) => {
      console.log(error);
    });
  }
}
