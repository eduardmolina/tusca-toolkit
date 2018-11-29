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
import WardSearch from '../WardSearch/WardSearch.jsx';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import PatientForm from '../PatientForm/PatientForm.jsx';

const styles = theme => ({
	around: {
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
  	width: '80vw'
  },
  textField: {
  	marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '40vw'
  },
  formControl: {
  	margin: theme.spacing.unit,
  	minWidth: 80
  }
});

class Ward extends React.Component {

	state = {
		searchOption: '',
    	textField: ''
	};

	_handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === 'searchOption' && !this.state.searchOption) {
    	this.props.fetchWards();
    }
  };

  render() {
    const { classes, successRegister, successPatientRegister, pgCode } = this.props;
    return (
    	<div className={classes.around} style={{ marginTop: '5vw' }}>
    		<Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={500}>
		    	<ExpansionPanel className={classes.expansion} >
		        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
		          <Typography className={classes.heading}>Cadastrar Paciente</Typography>
		        </ExpansionPanelSummary>
		        <ExpansionPanelDetails className={classes.around} >
		        	<PatientForm pgCode={pgCode} successRegister={successPatientRegister} unsetDBError={this.props.unsetDBError} register={this.props.registerPatient}/>
		        </ExpansionPanelDetails>
	      	</ExpansionPanel>
	      </Grow>
    		<Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={500}>
		    	<ExpansionPanel className={classes.expansion} >
		        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
		          <Typography className={classes.heading}>Cadastrar Consulta</Typography>
		        </ExpansionPanelSummary>
		        <ExpansionPanelDetails>
		          <Form pgCode={pgCode} forceFetch={this.props.fetchWards} unsetDBError={this.props.unsetDBError} register={this.props.register} successRegister={successRegister} />
		        </ExpansionPanelDetails>
	      	</ExpansionPanel>
	      </Grow>
	      <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={500}>
	      	<ExpansionPanel className={classes.expansion} >
		        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
		          <Typography className={classes.heading}>Buscar Consulta</Typography>
		        </ExpansionPanelSummary>
		        <ExpansionPanelDetails>
		        	<div style={{padding: '2vw', alignItems: 'flex-end', marginTop: '-8vh'}}>
			        	<div className={classes.around} style={{ flexDirection: 'row', alignItems: 'flex-end'}}>
					        <TextField
					          id='standard-search'
					          label='Buscar'
					          type='search'
					          className={classes.textField}
					          margin='normal'
					          onChange={this._handleChange}
					          name='textField'
					        />
					    		<FormControl className={classes.formControl}>
					          <InputLabel {...(this.state.textField.length > 0 &&
				    					!this.state.searchOption ? {'error': true} : '')} htmlFor='search-option'>Opção</InputLabel>
					          <Select {...(this.state.textField.length > 0 &&
				    					!this.state.searchOption ? {'error': true} : '')}
					            value={this.state.searchOption}
					            onChange={this._handleChange}
					            inputProps={{
					              name: 'searchOption',
					              id: 'search-option',
					            }}
					          >
					            <MenuItem value='Patient'>Paciente</MenuItem>
					            <MenuItem value='Diagnostic'>Diagnostico</MenuItem>
			          		</Select>
			        		</FormControl>
				        </div>
			        	<WardSearch filterThis={this.state.textField} filterBy={this.state.searchOption} data={this.props.wards} />
			        </div>
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