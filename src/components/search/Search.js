import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ProteinView from '../protein/ProteinView';
import SearchContainer from './form/SearchContainer';

class Search extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Results
            </Typography>
          </Toolbar>
        </AppBar>
        <SearchContainer />
        <ProteinView />
      </div>
    );
  }
}

export default Search;
