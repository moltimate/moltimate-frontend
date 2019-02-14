import React from 'react';
import PropTypes from 'prop-types';

import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function SelectedBreadCrumb(props) {
  const { classes } = props;

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" style={{color: 'white'}}/>}
      arial-label={`${props.crumbs[0]} ${props.crumbs[1]} ${props.crumbs[2]}`}
      className={classes.breadcrumb}
    >
      {props.crumbs.map((item,i) =>
        <Typography key={i} className={classes.footerText}>
          {item}
        </Typography>
      )}
    </Breadcrumbs>
  );
}

SelectedBreadCrumb.propTypes = {
  classes: PropTypes.object.isRequired,
  crumbs: PropTypes.Array,
};

export default withStyles(styles)(SelectedBreadCrumb);
