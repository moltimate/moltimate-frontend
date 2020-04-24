import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'

export default function ProteinLoading(props) {
  const {  } = props;

  return (
    <div style={{position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)'}}>
      <CircularProgress variant="indeterminate" size={192} thickness={6}/>
    </div>
  );
}