import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ViewerContainer from './results/ViewerContainer';
import SearchContainer from './form/SearchContainer';

class Search extends React.Component {
  state = {
    isOpen: true,
  };

  handleClickOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

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
        <SearchContainer
          isOpen={this.state.isOpen}
          handleClose={this.handleClose}
          handleClickOpen={this.handleClickOpen}
        />
        <ViewerContainer toggleSearch={this.handleClickOpen}/>
      </div>
    );
  }
}

export default Search;
