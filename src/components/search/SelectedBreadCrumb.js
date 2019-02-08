import React from 'react';
import PropTypes from 'prop-types';

import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';

function SelectedBreadCrumb(props) {
  // const {mode, base, compare} = this.props;
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      arial-label="Breadcrumb"
      style={{width: '300px'}}
    >
      <Typography color="inherit" href="/">
        Search
      </Typography>
      <Typography color="inherit" href="/">
        8GCH
      </Typography>
      <Typography color="textPrimary">1RTF</Typography>
    </Breadcrumbs>
  );
}

SelectedBreadCrumb.propTypes = {
  classes: PropTypes.object,
  mode: PropTypes.string,
  base: PropTypes.string,
  compare: PropTypes.string,
};


export default SelectedBreadCrumb;
