import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

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

class ResultList extends React.Component {

  state = {
    expanded: true,
    selected: null,
  };

  handleClick = (event, motif, base) => {
    this.setState({
      selected: motif.motifPdbId,
      result: base,
    });
    this.props.handleResultClick(event, motif, base);
  };

  render() {
    const { classes, results } = this.props;

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
}

/*



*/

ResultList.propTypes = {
  classes: PropTypes.object.isRequired,
  results: PropTypes.object.isRequired,
  handleResultClick: PropTypes.func.isRequired,
};

ResultList.defaultProps = {
  results: {}
};

export default withStyles(styles)(ResultList);
