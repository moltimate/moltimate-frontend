import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function About(props) {
  const { classes } = props;

  return (
    <div id='about' className={classes.about}>
      <div className={classes.aboutBox}>
        <Typography className={classes.title}>Moltimate Protein Analysis</Typography>
        <Typography className={`${classes.subTitle} ${classes.gray}`}>
          In recent years, structural genomics initiatives have generated a large number of protein structures. However, determining the function of these proteins through traditional experimental procedures can be a slow process. This disparity has been the motivation behind the creation of computational tools to predict function from structural homology. ProMOL is a plugin for the molecular visualization program, PyMOL, which uses catalytic site homology to predict the function of proteins with no known function. Grant Funding NSF-DUE 0402408, NIGMS 1R15GM078077, NIGMS 2R15GM078077-02, NIGMS 3R15GM078077-02S1, and NSF 1503811.
        </Typography>
      </div>
      <div className={classes.inlineFlex}>
        <Paper elevation={5} className={classes.cardIcon}>
          <div className={classes.aboutBox}>
            <SearchIcon className={`${classes.iconSize} ${classes.blue}`}/>
            <Typography className={`${classes.smallTitle} ${classes.blue}`}>Faster results with search.</Typography>
            <Typography className={`${classes.subTitle} ${classes.gray}`}>
            Build custom queries with a PDB entry to find its optimal alignment among a collection of motif templates.
            Narrow your results with filters and custom motifs. Like your results? Export feature available soon.
            </Typography>
          </div>
        </Paper>
        <Paper elevation={5} className={classes.cardIcon}>
          <div className={classes.aboutBox}>
            <SettingsIcon className={`${classes.iconSize} ${classes.cyan}`}/>
            <Typography className={`${classes.smallTitle} ${classes.cyan}`}>Build and test motifs with create.</Typography>
            <Typography className={`${classes.subTitle} ${classes.gray}`}>
            Create new motif templates to expand the options of your alignment searching and find more results.
            Compare and test against wide selection of motifs. Feature available soon.
            </Typography>
          </div>
        </Paper>
      </div>
    </div>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
