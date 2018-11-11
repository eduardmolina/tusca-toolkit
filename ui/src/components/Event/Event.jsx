import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GrowEvent from '../GrowEvent/GrowEvent.jsx';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CustomTable from '../CustomTable/CustomTable.jsx';


const styles = theme => ({
	around: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'flex-end'
	},
  textField: {
  	marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '50vw'
  },
  formControl: {
  	margin: theme.spacing.unit,
    minWidth: 120,
  }
});

class Event extends React.Component {

	state = {
    searchOption: '',
    textField: ''
  };

	_handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === 'searchOption' && !this.state.searchOption) {
    	this.props.fetchEvents();
    }
  };

  render() {
    const { classes } = this.props;

    return (
    	<div className={classes.around}>
	    	<GrowEvent timeout={500}>
	    		<div className={classes.around}>
	    			<TextField
		          id='standard-search'
		          label='Search'
		          type='search'
		          className={classes.textField}
		          margin='normal'
		          onChange={this._handleChange}
		          name='textField'
		        />
		    		<FormControl className={classes.formControl}>
		          <InputLabel {...(this.state.textField.length > 0 &&
	    					!this.state.searchOption ? {'error': true} : '')} htmlFor='search-option'>Option</InputLabel>
		          <Select {...(this.state.textField.length > 0 &&
	    					!this.state.searchOption ? {'error': true} : '')}
		            value={this.state.searchOption}
		            onChange={this._handleChange}
		            inputProps={{
		              name: 'searchOption',
		              id: 'search-option',
		            }}
		          >
		            <MenuItem value='Name'>Name</MenuItem>
		            <MenuItem value='Date'>Date</MenuItem>
          		</Select>
        		</FormControl>
	        </div>
	        <CustomTable filterThis={this.state.textField} filterBy={this.state.searchOption} data={this.props.events} />
	    	</GrowEvent>
	    </div>
    );
  }
}

Event.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Event);
