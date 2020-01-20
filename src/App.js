import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import LandingContainer from './landing/LandingContainer';
import Handle404 from './landing/Handle404';
import Publications from './landing/Publications';
import MoltimateContainer from './MoltimateContainer';

import theme from './theme';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';


const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Route exact path='/s' component={LandingContainer} />
      <Route exact path='/' component={MoltimateContainer} />
      <Route exact path='/publications' component={LandingContainer} />
    </BrowserRouter>
  </MuiThemeProvider>
);

export default (App);
