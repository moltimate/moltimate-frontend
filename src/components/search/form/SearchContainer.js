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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import ChipInput from 'material-ui-chip-input';
import Chip from '@material-ui/core/Chip';
import UploadFile from './UploadFile';
import DoneIcon from '@material-ui/icons/Done';

import styles from '../styles.js';
import { withStyles } from '@material-ui/core/styles';

class SearchContainer extends React.Component {
  state = {
    activeStep: 0,
    fileUploaded: false,
    files: [],
  };

    // TODO limit file type
    handleFileUpload = (event) => {
      const fileList = Array.from(event.currentTarget.files);
      this.setState({fileUploaded: true, files: fileList});
      this.props.dispatch(uploadFile(fileList));
    }

    handleSave = () => {
      this.props.dispatch(submitQuery());
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

    render() {
      const { classes } = this.props;

      return (
        <div style={{width: '300px', marginLeft: '10%'}}>
          <MultInputChip
            files={this.state.files}
            handleUpload={this.handleFileUpload}
            handleChange={this.handleChange}
            deleteFile={this.deleteFile}
          />
          <br/>
          <FormControlLabel
            control={
              <Switch
                id="options"
                value="rmsd"
                color="primary"
                onChange={this.handleChange}
              />
            }
            label="RMSD"
          />
          <br/>
          <Button
            onClick={this.handleSave}
            className={`${classes.outlineButton} ${classes.purpleBackground} ${classes.floatRight} ${classes.spaced}`}
          >Search</Button>
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
