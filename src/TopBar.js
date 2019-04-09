import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

import InvertColorsIcon from '@material-ui/icons/InvertColors';
import IconButton from '@material-ui/core/IconButton';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function TopBar(props) {
  const { classes, compare, base } = props;

  return (
    <AppBar className={classNames(classes.purpleGradient, classes.topLayer)}>
      <Toolbar>
        <Typography className={classes.title}>MOLTIMATE</Typography>
        <div className={classes.wide}>
          <IconButton className={classes.floatRight} onClick={() => console.log('temp')}>
            <SettingsIcon className={classNames(classes.floatRight, classes.white)}/>
          </IconButton>
          <IconButton className={classes.floatRight} onClick={() => console.log('temp')}>
            <InvertColorsIcon className={classNames(classes.floatRight, classes.white)}/>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);
/*
<Breadcrumbs
  separator={<NavigateNextIcon fontSize="small" style={{color: 'white'}}/>}
  className={classes.breadcrumb}
>
  {crumbs.map((item,i) =>
    <Typography key={i} className={classes.footerText}>
      {item}
    </Typography>
  )}
</Breadcrumbs>
*/
