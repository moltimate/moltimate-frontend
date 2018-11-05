import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import './App.css';

import Splash from './components/landing/Splash';
import Search from './components/search/Search';
import { theme } from './theme';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <div>
        <Route exact path='/' component={Splash} />
        <Route exact path='/search' component={Search} />
      </div>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default (App);
