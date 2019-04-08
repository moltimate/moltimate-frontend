import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default function ResultDetails(props) {
  const classes = useStyles();

  return (
    <div>
      Results
    </div>
  )
}
