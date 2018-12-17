import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

class MenuButton extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          className={classes.outlineButton}
          onClick={this.handleClick}
        >
          Start
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <NavLink to='/search'>
            <MenuItem onClick={this.handleClose}>Search</MenuItem>
          </NavLink>
          <NavLink to='/create'>
            <MenuItem onClick={this.handleClose}>Create</MenuItem>
          </NavLink>
        </Menu>
      </>
    );
  }
}

MenuButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuButton);
