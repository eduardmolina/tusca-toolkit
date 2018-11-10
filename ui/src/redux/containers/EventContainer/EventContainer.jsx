import {connect} from 'react-redux';

import Event from '../../../components/Event/Event.jsx';
import * as actions from '../../actions/actions.js';

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchEvents: () => {
			return dispatch(actions.fetchEvents());
		}
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
