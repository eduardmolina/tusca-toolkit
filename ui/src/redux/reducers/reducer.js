const _omit = (obj, key) => {
  delete obj[key];
  return obj;
}


const rds = (state={}, action) => {
  switch (action.type) {
    case 'SET_FETCHED_EVENTS':
    	return { ...state, events: action.payload };
    case 'DESTROY_EVENTS':
    	return _omit(state, 'events');
    case 'DESTROY_WARDS':
     return _omit(state, 'wards');
    case 'SET_REGISTER_RETURN_CODE':
      let wardPayload = action.payload;
      return { ...state, successRegister: wardPayload.returnCode, pgCode: wardPayload.pgCode };
    case 'UNSET_DB_ERROR':
      return {...state, successRegister: true, patientRegisterCode: true, pgCode: '' };
    case 'SET_FETCHED_WARDS':
      return { ...state, wards: action.payload };
    case 'SET_PATIENT_REGISTER_CODE':
      let patientPayload = action.payload;
      return { ...state, patientRegisterCode: patientPayload.returnCode, pgCode: patientPayload.pgCode };
    default:
      return state;
  }
}

export default rds;
