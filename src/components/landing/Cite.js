import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function About(props) {
  const { classes } = props;

  return (
    <div id='cite' className={classes.cite}>
      <div className={classes.aboutBox}>
        <Typography className={classes.title}>Citations</Typography>
      </div>
      <div className={classes.inlineFlex}>
        <Paper elevation={5} className={classes.miniPaper}>
          <Typography className={`${classes.subTitle} ${classes.gray}`}>
            NGL View
          </Typography>
        </Paper>
        <Paper elevation={5} className={classes.miniPaper}>
          <Typography className={`${classes.subTitle} ${classes.gray}`}>
            Dr. Paul Craig
          </Typography>
        </Paper>
        <Paper elevation={5} className={classes.miniPaper}>
          <Typography className={`${classes.subTitle} ${classes.gray}`}>
            Dr. Herbert Bernstein
          </Typography>
        </Paper>
        <Paper elevation={5} className={classes.miniPaper}>
          <Typography className={`${classes.subTitle} ${classes.gray}`}>
            Dr. Jeff Mills
          </Typography>
        </Paper>
        <Paper elevation={5} className={classes.miniPaper}>
          <Typography className={`${classes.subTitle} ${classes.gray}`}>
            Software Engineering Department at RIT
          </Typography>
        </Paper>
      </div>
    </div>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
