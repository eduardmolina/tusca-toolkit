import React from 'react';
import PropTypes from 'prop-types';
import GrowPaper from '../GrowPaper/GrowPaper.jsx';
import { withStyles } from '@material-ui/core/styles';
import eventImage from '../../images/event_image.jpg';
import wardImage from '../../images/ward_image.jpg';
import placeImage from '../../images/place_image.jpg';

const styles = theme => ({
  around: {
    display: 'flex'
  }
});

class Panel extends React.Component {

  componentDidMount() {
    this.props.destroyEvents();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.around}>
        <GrowPaper buttonValue='Eventos' newLocation='/events' image={eventImage} imageWidth='250vw' imageHeight='250vh' />
        <GrowPaper buttonValue='Enfermaria' newLocation='/wards' image={wardImage} imageWidth='250vw' imageHeight='250vh' timeout={1000} />
        <GrowPaper buttonValue='Postos' newLocation='/places' image={placeImage} imageWidth='250vw' imageHeight='250vh' timeout={2000} />
      </div>
    );
  }
}

Panel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Panel);
