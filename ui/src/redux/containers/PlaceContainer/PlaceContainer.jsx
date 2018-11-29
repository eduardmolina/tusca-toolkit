import {connect} from 'react-redux';

import Place from '../../../components/Place/Place.jsx';
import * as actions from '../../actions/actions.js';

const mapStateToProps = (state) => {
	return {
		analyticsData: state.analyticsData || { nurse: [] }
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getNurseData: () => {
			return dispatch(actions.getNurseData());
		}
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Place);
