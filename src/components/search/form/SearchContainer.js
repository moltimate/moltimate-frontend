import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import StepperContainer from './StepperContainer';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SearchContainer extends React.Component {
  handleFileUpload = (event) => {
    const fileList = Array.from(event.currentTarget.files);
    console.log(fileList.map(f => f.name).join(', '));
  }

  render() {
    const { classes, handleClose } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.isOpen}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Search
              </Typography>
            </Toolbar>
          </AppBar>
          <StepperContainer handleClose={handleClose}/>
        </Dialog>
      </div>
    );
  }
}

SearchContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchContainer);
