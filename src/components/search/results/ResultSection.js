import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },

  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

function ResultSection(props) {
  const { classes, results } = props;

  return (
    <List className={classes.root} subheader={<li />}>
      {results.map(result => (
        <>
        <li key={result.name} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.subheader}>Matches for {result.name}</ListSubheader>
            {result.matches.map((pdb, index) =>
              <ListItem key={index}>
                <ListItemText
                  primary={pdb.name}
                  secondary={pdb.rmsd}
                />
              </ListItem>
            )}
          </ul>
        </li>
        </>
      ))}
    </List>
  );
}

ResultSection.propTypes = {
  classes: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
};

export default withStyles(styles)(ResultSection);
