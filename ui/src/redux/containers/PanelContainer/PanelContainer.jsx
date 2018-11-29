import {connect} from 'react-redux';

import Panel from '../../../components/Panel/Panel.jsx';
import * as actions from '../../actions/actions.js';


const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		destroyEvents: () => {
			return dispatch(actions.destroyEvents());
		},
		destroyWards: () => {
			return dispatch(actions.destroyWards());
		}
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Panel);
