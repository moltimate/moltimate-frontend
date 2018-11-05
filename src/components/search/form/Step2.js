import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Filters from './Filters';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Step2 extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <>
      <input
        accept="*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <InputLabel>Custom Motifs</InputLabel>
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Upload
        </Button>
      </label>
      <Filters handleChange={this.props.handleChange}/>
      </>
    );
  }
}

Step2.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Step2);
