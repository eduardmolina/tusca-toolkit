import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  panelRoot: {
    width: '50vw',
    height: '50vh',
    margin: '5vw',
    marginTop: '10vw',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class GrowPaper extends React.Component {

  state = {
    show: false,
  };

  _handleClick = event => {
    event.preventDefault();
    this.changeLocation(this.props.newLocation);
  }

  changeLocation = location => {
    this.props.history.push(location);
  }

  handleChange = () => {
    this.setState(state => ({ show: !state.show }));
  };

  componentDidMount() {
    this.handleChange();
  }

  render() {
    const { show } = this.state;
    const { classes, buttonValue, timeout } = this.props;

    return (
      <Grow in={show} style={{ transformOrigin: '0 0 0' }} timeout={timeout}>
        <Paper elevation={12} className={classes.panelRoot}>
          <Button variant='contained' color='primary' className={classes.button} onClick={this._handleClick}>
            {buttonValue}
          </Button>
        </Paper>
      </Grow>
    );
  }
}

GrowPaper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(GrowPaper));
