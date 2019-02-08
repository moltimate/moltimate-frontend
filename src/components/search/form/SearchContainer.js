import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitQuery, uploadFile, updateQuery, updatePDBS } from '../../../actions/index';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MultInputChip from './MultInputChip';

import styles from '../styles.js';
import { withStyles } from '@material-ui/core/styles';

class SearchContainer extends React.Component {
  state = {
    open: true,
    scroll: 'paper',
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // TODO limit file type
  handleFileUpload = (event) => {
    const fileList = Array.from(event.currentTarget.files);
    this.setState({fileUploaded: true, files: fileList});
    this.props.dispatch(uploadFile(fileList));
  };

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
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll="body"
          className={classes.searchForm}
        >
          <DialogTitle id="scroll-dialog-title" className={classes.smallTitle}>Search</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <MultInputChip
                files={this.state.files}
                handleUpload={this.handleFileUpload}
                handleChange={this.handleChange}
                deleteFile={this.deleteFile}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} className={`${classes.outlineButton} ${classes.blueGradient}`}>
              Search
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SearchContainer.propTypes = {
  dispatch: PropTypes.func,
  classes: PropTypes.object,
  handleClose: PropTypes.func,
  status: PropTypes.bool,
};

const mapToProps = state => {
  return {
    status: state.status
  };
};

const withState = connect(mapToProps)(SearchContainer);
export default withStyles(styles)(withState);
