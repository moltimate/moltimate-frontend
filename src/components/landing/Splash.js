import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { init } from '../protein/ngl-util.js';
import Logo from './logo.png';
import Protein from './protein.png';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  toolBar: {
    background: 'white',
    color: '#434e61',
    fontFamily: 'Nunito, sans-serif',
    display: 'flex',
  },
  logo: {
    height: '60px',
    padding: '10px',
  },
  protein: {
    marginRight: '9%',
    height: '600px',
    marginTop: '3%'
  },
  float: {
    width: '100%',
    textAlign: 'right',
  },
  button: {
    marginRight: '20px'
  },
  createButton: {
    // border: '3px solid #08AEEA',
    //color: '#08AEEA',
    marginRight: '20px',
  },
  searchButton: {
    // border: '3px solid #2AF598',
    //color: '#2AF598',
    marginRight: '20px',
  },
  inlineFlex: {
    display: 'inline-flex',
    width: '100%',
  },
  titleContainer: {
    marginLeft: '15%',
    marginTop: '18%'
  },
  title: {
    fontSize: '40px',
  },
  subTitle: {
    fontSize: '20px',
    fontWeight: '200',
    width: '70%',
  },
};

function Splash(props) {
  init();
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <img className={classes.logo} src={Logo} />
          <div className={classes.float}>
            <Button className={classes.button}>About</Button>
            <Button className={classes.button}>Publications</Button>
            <Link to="/search">
              <Button className={classes.searchButton}>Search</Button>
            </Link>
            <Button className={classes.createButton}>Create</Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.inlineFlex}>
        <div className={classes.titleContainer}>
          <Typography className={classes.title}>Moltimate Protein Analysis</Typography>
          <Typography className={classes.subTitle}>Molecular visualization using catalytic site homology to predict unknown functions of proteins. </Typography>
        </div>
        <img className={classes.protein} src={Protein} />
      </div>
    </div>
  );
}

Splash.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Splash);
