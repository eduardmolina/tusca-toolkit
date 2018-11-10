import React from 'react';
import PropTypes from 'prop-types';
import GrowPaper from '../GrowPaper/GrowPaper.jsx';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  around: {
    display: 'flex'
  }
});

class Panel extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.around}>
        <GrowPaper buttonValue='Eventos' newLocation='/events'/>
        <GrowPaper buttonValue='Enfermaria' newLocation='/wards' timeout={1000} />
        <GrowPaper buttonValue='Postos' newLocation='/places' timeout={2000} />
      </div>
    );
  }
}

Panel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Panel);
