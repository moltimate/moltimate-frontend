import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import About from './About';
import Cite from './Cite';
import Footer from './Footer';
import NavBar from './NavBar';
import Protein from './protein.png';
import Publications from './Publications';

import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function Splash(props) {
  const { classes } = props;

  return (
    <>
      <NavBar />
      <div>
        <div className={classes.root}>
          <div className={classes.inlineFlex}>
            <div className={classes.titleContainer}>
              <Typography className={classes.title}>Moltimate Protein Analysis</Typography>
              <Typography className={classes.subTitle}>Molecular visualization using catalytic site homology to analyze proteins of unknown functions.</Typography>
              <a href='#about'>
                <Button className={`${classes.outlineButton} ${classes.blueGradient} ${classes.buttonMargin}`}>Learn More</Button>
              </a>
            </div>
            <img alt="1rtf and 8gch alignment" className={classes.protein} src={Protein} />
          </div>
          <About />
          <Cite />
          <Publications />
          <Footer/>
        </div>
      </div>
    </>
  );
}

Splash.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Splash);
