import React from 'react';
import PropTypes from 'prop-types';
import GrowPaper from '../GrowPaper/GrowPaper.jsx';
import { withStyles } from '@material-ui/core/styles';
import eventImage from '../../images/event_image.jpg';
import wardImage from '../../images/ward_image.jpg';


const styles = theme => ({
  around: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class Panel extends React.Component {

  componentDidMount() {
    this.props.destroyEvents();
    this.props.destroyWards();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.around}>
        <GrowPaper buttonValue='Eventos' newLocation='/events' image={eventImage} imageWidth='25vw' imageHeight='45vh' />
        <GrowPaper buttonValue='Enfermaria' newLocation='/wards' image={wardImage} imageWidth='25vw' imageHeight='45vh' timeout={1000} />
      </div>
    );
  }
}

Panel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Panel);
