import React from 'react';
import PropTypes from 'prop-types';
import GrowPaper from '../GrowPaper/GrowPaper.jsx';
import { withStyles } from '@material-ui/core/styles';
import eventImage from '../../images/event_image.jpg';
import wardImage from '../../images/ward_image.jpg';
import placeImage from '../../images/place_image.jpg'


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
        <GrowPaper buttonValue='Eventos' newLocation='/events' image={eventImage} imageWidth='20vw' imageHeight='37vh' />
        <GrowPaper buttonValue='Enfermaria' newLocation='/wards' image={wardImage} imageWidth='20vw' imageHeight='37vh' timeout={1000} />
        <GrowPaper buttonValue='Estatísticas' newLocation='/places' image={placeImage} imageWidth='20vw' imageHeight='37vh' timeout={2000} />
      </div>
    );
  }
}

Panel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Panel);
