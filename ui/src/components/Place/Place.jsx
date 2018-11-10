import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GrowEvent from '../GrowEvent/GrowEvent.jsx';


const styles = theme => ({
	around: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center'
	}
});

class Place extends React.Component {
  render() {
    const { classes } = this.props;

    return (
    	<div className={classes.around}>
	    	<GrowEvent timeout={500}>
	    	</GrowEvent>
	    </div>
    );
  }
}

Place.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Place);