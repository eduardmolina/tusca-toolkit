import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AnalyticsTable from '../AnalyticsTable/AnalyticsTable.jsx';


const styles = theme => ({
	around: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '5vw'
	},
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expansion: {
  	width: '80vw'
  }
});

class Place extends React.Component {

	componentDidMount() {
		this.props.getNurseData();
	}

  render() {
    const { classes, analyticsData } = this.props;

    return (
    	<div className={classes.around}>
    	  <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={500}>
					<ExpansionPanel className={classes.expansion} >
			  		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
			    		<Typography className={classes.heading}>Numero de atendimentos por enfermeiro(a)</Typography>
			  		</ExpansionPanelSummary>
			  		<ExpansionPanelDetails >
							<AnalyticsTable data={analyticsData.nurse} />
			  		</ExpansionPanelDetails>
	      	</ExpansionPanel>
	      </Grow>
	    </div>
    );
  }
}

Place.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Place);