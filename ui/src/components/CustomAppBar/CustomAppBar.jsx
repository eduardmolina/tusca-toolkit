import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


class CustomAppBar extends React.Component {
  render() {
    const { appBarTitle } = this.props;

    return (
      <AppBar position='static' color='default'>
        <Toolbar>
          <Typography variant='h6' color='inherit'>
            {appBarTitle}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

CustomAppBar.propTypes = {
  appBarTitle: PropTypes.string.isRequired,
};

export default CustomAppBar;
