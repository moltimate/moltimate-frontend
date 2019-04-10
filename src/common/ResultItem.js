import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CheckCirclOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import BlockIcon from '@material-ui/icons/Block';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default function ResultItem(props) {
  const { results, isSuccess, handleSelectedResult, parent } = props;
    return (
      <>
        { results.map((r, k) => {
          return (
            <ListItem
              button
              onClick={(e) => handleSelectedResult(e, r, parent)}
              key={k}
            >
              <ListItemIcon>
                { isSuccess ? <CheckCirclOutlineIcon style={{color: '#84C556'}}/>
                  : <BlockIcon color='error'/>
                }
              </ListItemIcon>
              <ListItemText
                primary={r.pdbId}
                secondary={`EC ${r.ecNumber}`}
              />
              <div>
                <ListItemText
                  style={{float: 'right'}}
                  primary='RMSD'
                  secondary={`${r.rmsd ? r.rmsd.toFixed(4) : 'n/a'}`}
                />
              </div>
            </ListItem>
          )
        })}
      </>
    );
}

ResultItem.propTypes = {
  handleSelectedResult: PropTypes.func,
  isSuccess: PropTypes.bool,
  results: PropTypes.array,
};

ResultItem.defaultProps = {
  results: [],
};
