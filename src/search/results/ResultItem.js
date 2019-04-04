import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    width: '100%',
    height: '70%',

  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  ul: {
    paddingLeft: '0',
  },
  button: {

  },
  selected: {
    backgroundColor: '#EEEEEE'
  }
});

function ResultItem(props) {
  const [expanded, setExpanded] = useState(true);
  const [selected, setSelected] = useState(null);
  const { classes, results } = props;

    return (
      <List className={classes.root} subheader={<li />}>
        {Object.keys(results).map(
          result =>
            <li key={result} className={classes.listSection}>
              <ul className={classes.ul}>
                <ListSubheader className={classes.secondaryHeading}>Matches for {result}</ListSubheader>
                {results[result].map((pdb) =>
                  <li key={pdb.motifPdbId}>
                    <Button
                      onClick={(e) => this.handleClick(e, pdb, result)}
                      fullWidth
                      className={this.state.selected === pdb.motifPdbId && this.state.result === result ? classes.selected : classes.button}
                    >
                      <ListItemText
                        primary={pdb.motifPdbId}
                        secondary={'rmsd: ' + pdb.rmsd}
                      />
                    </Button>
                  </li>
                )}
              </ul>
            </li>
        )}
      </List>
    );
}

ResultItem.propTypes = {
  classes: PropTypes.object.isRequired,
  results: PropTypes.object,
  handleResultClick: PropTypes.func,
};

ResultItem.defaultProps = {
  results: {}
};

export default withStyles(styles)(ResultItem);
