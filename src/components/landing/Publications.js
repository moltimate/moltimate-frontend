import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import BASIL from './basil.png';
import DOWLING from './dowling.png';
import NSF from './nsf.png';
import RIT from './RIT.png';
import SBEVSL from './sbevsl.png';

import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

class Publications extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div id='contributors' className={classes.centeredText}>
        <Typography className={`${classes.subTitle} ${classes.gray}`}>In Collaboration With: </Typography>
        <div className={classes.logoBox}>
          <img alt="Rochester Institute of Technology Logo " className={classes.image} src={RIT} />
          <img alt="BASIL Project Logo" className={classes.image} src={BASIL} />
          <img alt="Dowling College Logo" className={classes.image} src={DOWLING} />
          <img alt="NSF Grant Logo" className={classes.image} src={NSF} />
          <img alt="SBEVSL Project Logo" className={classes.image} src={SBEVSL} />
        </div>
      </div>
    );
  }
}

Publications.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Publications);
