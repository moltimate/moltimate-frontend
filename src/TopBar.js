import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function TopBar(props) {
  const { classes, compare, base } = props;
  const crumbs = ['Search'];
  crumbs.push(compare, base);

  return (
    <AppBar className={classNames(classes.purpleGradient, classes.topLayer)}>
      <Toolbar>
        <Typography className={classes.title}>MOLTIMATE</Typography>
        <div className={classes.wide}>
          <Link to="/">
            <ExitToAppIcon className={classNames(classes.floatRight, classes.white)}/>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  compare: PropTypes.string,
  base: PropTypes.string
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
