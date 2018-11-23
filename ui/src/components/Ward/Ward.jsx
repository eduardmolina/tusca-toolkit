import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Form from '../Form/Form.jsx';
import Grow from '@material-ui/core/Grow';


const styles = theme => ({
	around: {
		marginTop: '10vw',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center'
	},
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expansion: {
  	minWidth: '50vw'
  }
});

class Ward extends React.Component {
  render() {
    const { classes, successRegister } = this.props;

    return (
    	<div className={classes.around}>
    		<Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={500}>
		    	<ExpansionPanel className={classes.expansion} >
		        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
		          <Typography className={classes.heading}>Cadastrar</Typography>
		        </ExpansionPanelSummary>
		        <ExpansionPanelDetails>
		          <Form unsetDBError={this.props.unsetDBError} register={this.props.register} successRegister={successRegister} />
		        </ExpansionPanelDetails>
	      	</ExpansionPanel>
	      </Grow>
	      <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={500}>
	      	<ExpansionPanel className={classes.expansion} >
		        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
		          <Typography className={classes.heading}>Consultar</Typography>
		        </ExpansionPanelSummary>
		        <ExpansionPanelDetails>
		        	a
		        </ExpansionPanelDetails>
	      	</ExpansionPanel>
	      </Grow>
	    </div>
    );
  }
}

Ward.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Ward);