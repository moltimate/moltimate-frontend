import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CheckCirclOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import BlockIcon from '@material-ui/icons/Block';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default function ResultItem(props) {
  const { results, isSuccess } = props;

    return (
      <List>
        { results.map((r, k) => {
          return (
            <ListItem key={k}>
              <ListItemIcon>
                { isSuccess ? <CheckCirclOutlineIcon style={{color: '#84C556'}}/>
                  : <BlockIcon color='error'/>
                }
              </ListItemIcon>
              <ListItemText
                primary={r.queryPdbId}
                secondary={`EC ${r.queryEcNumber}`}

              />
              <ListItemText
                primary='RMSD'
                secondary={`${r.rmsd ? r.rmsd.toFixed(4) : ''}`}
              />
            </ListItem>
          )
        })}
      </List>
    );
}

ResultItem.propTypes = {
  results: PropTypes.array,
};

ResultItem.defaultProps = {
  results: []
};
