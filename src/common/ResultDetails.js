import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';

import ListItemText from '@material-ui/core/ListItemText';

import ErrorIcon from '@material-ui/icons/Error';

const styles = {
  card: {
    width: '230px',
    padding: '0 0 0 10px',
    position: 'fixed',
    top: '80px',
    right: '15px',
    float: 'right',
  },
  noPadding: {
    padding: '5px',
  },
  icon: {
    fontSize: 14,
    margin: '5px 5px 0 5px'
  },
  fileIcon: {
    fontSize: 16,
    marginRight: '10px'
  },
  linkOverride: {
    color: 'rgba(0, 0, 0, 0.87)',
  },
  white: {
    color: 'white'
  },
  closeIcon: {
    color: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    right: '0px',
  }
};

function ResultDetails(props) {
  const { classes, compare, activeSiteResidues, motifPdbId, motifEC, handleClose } = props;

  return (
      <Card className={classes.card}>
        <IconButton className={classes.closeIcon} onClick={() => handleClose(false)}><CloseIcon /></IconButton>
        <CardContent>
          <div style={{display: 'flex'}}>
            <ListItem className={classes.noPadding}>
              <ListItemText
                primary={
                  <>
                    <Typography variant='subtitle2' color='primary'>Query</Typography>
                    <Typography variant='body2'>EC Class</Typography>
                  </>
                }
                secondary={compare.queryEcNumber}
              />
            </ListItem>
            <ListItem className={classes.noPadding}>
              <ListItemText
                primary={
                  <>
                    <Typography color='primary'>Motif</Typography>
                    <Typography variant='body2'>EC Class</Typography>
                  </>
                }
                secondary={motifEC}
              />
            </ListItem>
          </div>
          <div style={{display: 'flex'}}>
            <ListItem className={classes.noPadding}>
              <ListItemText
                primary={
                  <a
                    className={classes.linkOverride}
                    href={`https://www.rcsb.org/structure/${compare.queryPdbId}`}
                    target="_blank"
                  >
                    <Typography variant='body2'>
                      {compare.queryPdbId}
                      <InfoIcon color="disabled" className={classes.icon}/>
                    </Typography>
                  </a>
                }
                secondary={compare.alignedResidues.map((r, k) => {
                  return (
                    <Typography key={k} variant='body2' component={'span'} className={classes.title} color="textSecondary" >
                      {r.identifier.toUpperCase()}
                    </Typography>
                  )})}
                />
            </ListItem>
            <ListItem className={classes.noPadding}>
              <ListItemText
                primary={
                  <a
                    className={classes.linkOverride}
                    href={`https://www.rcsb.org/structure/${motifPdbId}`}
                    target="_blank"
                  >
                    <Typography variant='body2'>
                      {motifPdbId}
                      <InfoIcon color="disabled" className={classes.icon}/>
                    </Typography>
                  </a>
                }
                secondary={activeSiteResidues.map((r, k) => {
                  return (
                    <Typography variant='body2' component={'span'} key={k} className={classes.title} color="textSecondary" >
                      {r.identifier.toUpperCase()}
                    </Typography>
                  )})}
                />
            </ListItem>
          </div>
          <div style={{display: 'flex'}}>
            <ListItem className={classes.noPadding}>
              <Tooltip
                placement="right"
                interactive
                title={
                    <CopyToClipboard text={compare.rmsd}>
                      <Button
                        className={classes.white}
                        variant='outlined'
                      >
                        <FileCopyIcon className={classes.fileIcon}/>
                        {compare.rmsd}
                      </Button>
                    </CopyToClipboard>
                }>
                <ListItemText
                  primary={<Typography variant='body2'>RMSD</Typography>}
                  secondary={compare.rmsd.toFixed(4)}
                />
              </Tooltip>
            </ListItem>
          </div>
        </CardContent>
      </Card>
  );
}

ResultDetails.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ResultDetails);
