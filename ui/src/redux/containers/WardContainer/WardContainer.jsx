import {connect} from 'react-redux';

import Ward from '../../../components/Ward/Ward.jsx';
import * as actions from '../../actions/actions.js';


const mapStateToProps = (state) => {
	return {
		successRegister: state.successRegister
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (cpf, name, lastName) => {
			return dispatch(actions.register(cpf, name, lastName));
		},
		unsetDBError: () => {
			return dispatch(actions.unsetError());
		}
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ward);
