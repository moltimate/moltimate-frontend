import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import SelectedBreadCrumb from './SelectedBreadCrumb';
import ProteinContainer from '../protein/ProteinContainer';
import SideMenu from './SideMenu';

import SearchIcon from '@material-ui/icons/Search';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import GetAppIcon from '@material-ui/icons/GetApp';
import BuildIcon from '@material-ui/icons/Build';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

/*
THIS IS THE FUNCTIONALITY FOR THE FORM
// TODO limit file type
handleFileUpload = (event) => {
  const fileList = Array.from(event.currentTarget.files);
  this.setState({fileUploaded: true, files: fileList});
  this.props.dispatch(uploadFile(fileList));
}

handleSave = () => {
  this.props.dispatch(submitQuery());
  this.handleNext();
};

deleteFile = (file, event) => {
  this.setState({
    files: this.state.files.filter(f => {
      return f.name !== file;
    })
  });
};

handleChange = (event) => {
  if (event.target && event.target.type === 'checkbox') {
    this.props.dispatch(updateQuery(event.target.id, event.target.value));
  }
  else {
    this.props.dispatch(updatePDBS(event));
  }
}
*/

class TopBar extends React.Component {
  state = {
    open: false,
    base: '-',
    compare: '-'
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClick = (event, motif, base) => {
    console.log(base);
    console.log(motif);
    this.setState({
      compare: motif,
      base: base,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.purpleGradient}>
          <Toolbar>
            <SelectedBreadCrumb crumbs={['Search', this.state.base, this.state.compare.motifPdbId]} />
            <div className={classes.wide}>
              <ExitToAppIcon className={classes.floatRight}/>
            </div>
          </Toolbar>
        </AppBar>
        <SideMenu results={this.props.results} handleResultClick={this.handleClick}/>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <ProteinContainer base={this.state.base} compare={this.state.compare}/>
        </main>
      </div>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  results: PropTypes.object.results,
};

const mapToProps = state => {
  return {
    results: state.search.results
  };
};

const withState = connect(mapToProps)(TopBar);

export default withStyles(styles, { withTheme: true })(withState);
