import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import About from './About';
import Logo from './logo.png';
import MenuButton from './MenuButton';
import NavBar from './NavBar';
import Protein from './protein.png';

import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function Splash(props) {
  const { classes } = props;

  return (
    <>
      <NavBar />
      <div className={classes.root}>
        <div className={classes.inlineFlex}>
          <div className={classes.titleContainer}>
            <Typography className={classes.title}>Moltimate Protein Analysis</Typography>
            <Typography className={classes.subTitle}>Molecular visualization using catalytic site homology to predict unknown functions of proteins. </Typography>
            <Link to="#about">
              <Button className={classes.gradientButton}>Learn More</Button>
            </Link>
          </div>
          <img alt="1rtf and 8gch alignment" className={classes.protein} src={Protein} />
        </div>
        <About />
      </div>
    </>
  );
}

Splash.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Splash);
