import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import ErrorIcon from '@material-ui/icons/Error';

const styles = {
  card: {
    minWidth: 275,
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
};


function SelectedResult(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="p">
          RMSD: <Typography color="textSecondary" >0.0</Typography>
        </Typography>
        <Typography component="p">
          EC Class: <Typography color="textSecondary" >0.0.0.0</Typography>
        </Typography>
        <br/>
        <div style={{display: 'flex'}}>
          <div style={{width: '85px'}}>
            <Typography component="p">
              8GCH
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom >
            HIS 57:B <br/>
            ASP 102:B <br/>
            GLY 193:B <br/>
            SER 195:B
            </Typography>
          </div>
          <div style={{width: '85px'}}>
            <Typography component="p">
              1RTF
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom >
            HIS 57:F <br/>
            ASP 102:F <br/>
            GLY 193:G <br/>
            SER 195:G
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

SelectedResult.propTypes = {
  classes: PropTypes.object.isRequired,
  alignmentDetails: PropTypes.object
};

export default withStyles(styles)(SelectedResult);
