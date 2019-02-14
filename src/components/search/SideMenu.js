import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RestoreIcon from '@material-ui/icons/Restore';
import BuildIcon from '@material-ui/icons/Build';

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import FormTab from './form/FormTab';
import SearchContainer from './form/SearchContainer';
import Results from './Results';

const drawerWidth = 350;

const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: '64px'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    marginTop: '64px',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    marginTop: '64px',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    marginTop: '64px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
});

class SideMenu extends React.Component {
  state = {
    open: false,
    build: false,
    results: false
  };

  handleToggleDrawer = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleBuildTab = () => {
    this.setState({
      build: !this.state.build
    });
  };

  handleResultsTab = () => {
    this.setState({
      results: !this.state.results
    });
  };

  handleResultClick = (event, motif, base) => {
    this.setState({
      base: base,
      compare: motif,
    });
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: this.state.open,
          [classes.drawerClose]: !this.state.open,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          }),
        }}
        open={this.state.open}
      >
        <Divider />
        <List>
          <ListItem button >
            <ListItemIcon>
              <BuildIcon onClick={this.handleToggleDrawer}/>
            </ListItemIcon>
            <ListItemText inset primary="Query" onClick={this.handleBuildTab}/>
            {this.state.expand ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.build}>
            <SearchContainer />
          </Collapse>
          <Divider />
          <ListItem button >
            <ListItemIcon>
              <RestoreIcon onClick={this.handleToggleDrawer}/>
            </ListItemIcon>
            <ListItemText inset primary="Results" onClick={this.handleResultsTab}/>
            {this.state.results ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.results}>
            <Results results={this.props.results} handleResultClick={this.handleResultClick}/>
          </Collapse>
        </List>
      </Drawer>
    );
  }
}

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  results: PropTypes.object.results
};

const mapToProps = state => {
  return {
    results: state.search.results
  };
};

const withState = connect(mapToProps)(SideMenu);

export default withStyles(styles, { withTheme: true })(withState);
