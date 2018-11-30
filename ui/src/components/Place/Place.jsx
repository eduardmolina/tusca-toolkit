import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HourTable from '../HourTable/HourTable.jsx';
import NurseTable from '../NurseTable/NurseTable.jsx';
import ParticipantTable from '../ParticipantTable/ParticipantTable.jsx';
import EventTable from '../EventTable/EventTable.jsx';


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
  	width: '30vw'
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
    	  	<div>
						<ExpansionPanel className={classes.expansion} >
				  		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				    		<Typography className={classes.heading}>Numero de atendimentos por enfermeiro(a)</Typography>
				  		</ExpansionPanelSummary>
				  		<ExpansionPanelDetails>
				  			<div style={{padding: '2vw', alignItems: 'flex-end', marginTop: '-8vh'}}>
									<NurseTable data={analyticsData.nurse} />
								</div>
				  		</ExpansionPanelDetails>
		      	</ExpansionPanel>
		      	<ExpansionPanel className={classes.expansion} >
				  		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				    		<Typography className={classes.heading}>Numero de atendimentos por hora</Typography>
				  		</ExpansionPanelSummary>
				  		<ExpansionPanelDetails>
				  			<div style={{padding: '2vw', alignItems: 'flex-end', marginTop: '-8vh'}}>
									<HourTable data={analyticsData.hour} />
								</div>
				  		</ExpansionPanelDetails>
		      	</ExpansionPanel>
		      	<ExpansionPanel className={classes.expansion} >
				  		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				    		<Typography className={classes.heading}>Participantes que compareceram em todas as festas</Typography>
				  		</ExpansionPanelSummary>
				  		<ExpansionPanelDetails>
				  			<div style={{padding: '2vw', alignItems: 'flex-end', marginTop: '-8vh'}}>
									<ParticipantTable data={analyticsData.participant} />
								</div>
				  		</ExpansionPanelDetails>
		      	</ExpansionPanel>
		      	<ExpansionPanel className={classes.expansion} >
				  		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				    		<Typography className={classes.heading}>Numero de atendimentos por tipo de evento</Typography>
				  		</ExpansionPanelSummary>
				  		<ExpansionPanelDetails>
				  			<div style={{padding: '2vw', alignItems: 'flex-end', marginTop: '-8vh'}}>
									<EventTable data={analyticsData.event} />
								</div>
				  		</ExpansionPanelDetails>
		      	</ExpansionPanel>
	      	</div>
	      </Grow>
	    </div>
    );
  }
}

Place.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Place);