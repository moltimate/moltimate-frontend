import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';

import Button from '@material-ui/core/Button';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';

import FilterButton from './FilterButton';

import { rmsd, pdbId, ecNumber } from './inputs';

export default function Filters(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { handleFilters, filters }
  const open = Boolean(anchorEl);
  const id = open ? 'ecNumberFilter' : null;

  return (
    <div style={{margin: '5% 10%'}}>
      <Typography color="textSecondary">Filters:</Typography>
        <FilterButton
          buttonTitle='EC Class'
          handleFilters={handleFilters}
          filters={filters}
          popoverContent={ecNumber}
        />
        <FilterButton
          buttonTitle='RMSD'
          handleFilters={handleFilters}
          filters={filters}
          popoverContent={rmsd}
        />
        <FilterButton
          buttonTitle='PDB Id'
          handleFilters={handleFilters}
          filters={filters}
          popoverContent={pdbId}
        />
      <Divider />
    </div>
  );
}

Filters.propTypes = {
  classes: PropTypes.object,
};
