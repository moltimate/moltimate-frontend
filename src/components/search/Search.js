import React from 'react';
import PropTypes from 'prop-types';

import MiniDrawer from './MiniDrawer';

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
        <MiniDrawer />
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
