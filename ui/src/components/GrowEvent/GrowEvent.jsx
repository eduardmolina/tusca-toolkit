import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';


const styles = theme => ({
  paper: {
    width: '70vw',
    height: '60vh',
    margin: '7vw',
  }
});

class GrowEvent extends React.Component {
  state = {
    show: false,
  };

  _handleChange = () => {
    this.setState(state => ({ show: !state.checked }));
  };

  componentDidMount() {
    this._handleChange();
  }

  render() {
    const { show } = this.state;
    const { classes, timeout } = this.props;

    return (
    <Grow in={show} style={{ transformOrigin: '0 0 0' }} timeout={timeout}>
      <Paper elevation={12} className={classes.paper}>
      </Paper>
    </Grow>
    );
  }
}

GrowEvent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GrowEvent);