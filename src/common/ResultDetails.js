import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';

import InfoIcon from '@material-ui/icons/Info';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ListItemText from '@material-ui/core/ListItemText';

import ErrorIcon from '@material-ui/icons/Error';

const styles = {
  card: {
    maxWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  icon: {
    fontSize: 14,
    marginLeft: '5px'
  },
  linkOverride: {
    color: 'rgba(0, 0, 0, 0.87)',
  }
};


function ResultDetails(props) {
  const { classes, compare, activeSiteResidues, motifPdbId } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <ListItem>
          <ListItemText
            primary='RMSD'
            secondary={compare.rmsd.toFixed(4)}
          />
          <ListItemText
            primary='EC Class'
            secondary={compare.queryEcNumber}
          />
        </ListItem>
        <div style={{display: 'flex'}}>
          <ListItem>
            <ListItemText
              primary={
                <a
                  className={classes.linkOverride}
                  href={`https://www.rcsb.org/structure/${compare.queryPdbId}`}
                  target="_blank"
                >
                  {compare.queryPdbId}
                  <InfoIcon color="disabled" className={classes.icon}/>
                </a>
              }
              secondary={compare.alignedResidues.map((r, k) => {
                return (
                  <Typography key={k} className={classes.title} color="textSecondary" >
                    {r.identifier}
                  </Typography>
                )})}
              />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <a
                  className={classes.linkOverride}
                  href={`https://www.rcsb.org/structure/${motifPdbId}`}
                  target="_blank"
                >
                  {motifPdbId}
                  <InfoIcon color="disabled" className={classes.icon}/>
                </a>
              }
              secondary={activeSiteResidues.map((r, k) => {
                return (
                  <Typography key={k} className={classes.title} color="textSecondary" >
                    {r.identifier}
                  </Typography>
                )})}
              />
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
