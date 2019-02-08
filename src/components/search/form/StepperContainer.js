import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { submitQuery, uploadFile, updateQuery, updatePDBS } from '../../../actions/index';

import Switch from '@material-ui/core/Switch';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Step1 from './Step1';
import Filters from './Filters';
import Step3 from './Step3';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['Proteins', 'Filters', 'Calculations'];
const messages = ['Your search is being processed', 'Your request was not processed.'];
const buttonText = ['View Results', 'Try Again'];

class StepperContainer extends React.Component {

  state = {
    activeStep: 0,
    fileUploaded: false,
    files: [],
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };



  getStepContent(step) {
    switch (step) {
    case 0:
      return <Step1
        files={this.state.files}
        handleUpload={this.handleFileUpload}
        handleChange={this.handleChange}
        deleteFile={this.deleteFile}
      />;
    case 1:
      return <Filters handleChange={this.handleChange}/>;
    case 2:
      return <Step3 handleChange={this.handleChange}/>;
    default:
      throw new Error('Unknown step');
    }
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    {this.props.status !== 'error' ? messages[0] : messages[1]}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.props.handleClose}>
                    {this.props.status !== 'error' ? buttonText[0] : buttonText[1]}
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={activeStep === steps.length - 1 ? this.handleSave : this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Search' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

StepperContainer.propTypes = {
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

const withState = connect(mapToProps)(StepperContainer);
export default withStyles(styles)(withState);
