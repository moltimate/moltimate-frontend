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
  const { handleFilters, filters } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'ecNumberFilter' : null;

  return (
    <div style={{margin: '5% 10%'}}>
      <Typography color="textSecondary">Filters:</Typography>
        <FilterButton
          buttonTitle='EC Class'
          popoverContent={ecNumber}
          handleFilters={handleFilters}
          filters={filters}
        />
        <FilterButton
          buttonTitle='RMSD'
          popoverContent={rmsd}
          handleFilters={handleFilters}
          filters={filters}
        />
        <FilterButton
          buttonTitle='PDB Id'
          popoverContent={pdbId}
          handleFilters={handleFilters}
          filters={filters}
        />
      <Divider />
    </div>
  );
}

Filters.propTypes = {
  classes: PropTypes.object,
};
