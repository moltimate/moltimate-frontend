import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TopBar from './TopBar';
import SearchContainer from './form/SearchContainer';
import MenuIcon from '@material-ui/icons/Menu';

import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

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
        <TopBar />
        <div style={{float: 'right', zindex: '10', position: 'absolute', bottom: '40vh', left: '95%'}}>
          <Button variant="fab" color="primary" aria-label="Add" className={this.props.classes.purpleBackground}>
            <MenuIcon />
          </Button>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
