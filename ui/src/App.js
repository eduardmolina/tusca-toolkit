import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PanelContainer from './redux/containers/PanelContainer/PanelContainer.jsx';
import EventContainer from './redux/containers/EventContainer/EventContainer.jsx';
import PlaceContainer from './redux/containers/PlaceContainer/PlaceContainer.jsx';
import WardContainer from './redux/containers/WardContainer/WardContainer.jsx';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomAppBar from './components/CustomAppBar/CustomAppBar.jsx';

const theme = createMuiTheme({
  palette: {
    primary: orange
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <CustomAppBar appBarTitle='Tusca Toolkit'/>
	      <Router>
	        <Switch>
	            <Route exact path="/" component={PanelContainer} />
              <Route exact path="/events" component={EventContainer} />
              <Route exact path="/places" component={PlaceContainer} />
              <Route exact path="/wards" component={WardContainer} />
	          </Switch>
	      </Router>
	    </MuiThemeProvider>
    );
  }
}

export default App;
