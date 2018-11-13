import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
import ResultSection from './ResultSection';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

const results = [
  {
    name: 'ab1c',
    matches: [
      {
        name: '1234',
        rmsd: '2.3'
      },
      {
        name: 'as54',
        rmsd: '1.3'
      },
      {
        name: 'agh3',
        rmsd: '0.7'
      },
      {
        name: 'plw1',
        rmsd: '0'
      },
      {
        name: 'hte3',
        rmsd: '0.1'
      },
      {
        name: 'ertr',
        rmsd: '0'
      }
    ]
  },
  {
    name: 'djfr',
    matches: [
      {
        name: 'sdlk',
        rmsd: '1.0'
      },
      {
        name: 'fgof',
        rmsd: '3.0'
      }
    ]
  },
];


class ResultList extends React.Component {
  state = {
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };


  render() {
    return (
      <>
        <ListItem button onClick={this.handleClick}>
          <ListItemText primary="Results" />
        </ListItem>
        <ResultSection results={results}/>
      </>
    );
  }
}

ResultList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultList);
