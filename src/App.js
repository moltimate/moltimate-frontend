import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import LandingContainer from './landing/LandingContainer';
import Handle404 from './landing/Handle404';
import Publications from './landing/Publications';
import MoltimateContainer from './MoltimateContainer';

import { theme } from './theme';
import './app.css';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Route exact path='/' component={LandingContainer} />
      <Route exact path='/search' component={MoltimateContainer} />
      <Route exact path='/publications' component={LandingContainer} />
    </BrowserRouter>
  </MuiThemeProvider>
);

export default (App);
