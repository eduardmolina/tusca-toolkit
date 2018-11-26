import {connect} from 'react-redux';

import Ward from '../../../components/Ward/Ward.jsx';
import * as actions from '../../actions/actions.js';


const mapStateToProps = (state) => {
	return {
		wards: state.wards || [],
		successRegister: state.successRegister
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (cpf,
				id,
				nurse,
				companion,
				diagnostic,
				date) => {
			return dispatch(actions.register(
				cpf,
				id,
				nurse,
				companion,
				diagnostic,
				date));
		},
		unsetDBError: () => {
			return dispatch(actions.unsetError());
		},
		fetchWards: () => {
			return dispatch(actions.fetchWards());
		}
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ward);
