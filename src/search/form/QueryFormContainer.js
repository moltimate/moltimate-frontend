import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import BuildIcon from '@material-ui/icons/Build';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

import ChipWithIcon from './ChipWithIcon';
import Mask from './Mask';
import Slide from './Slide';
import UploadFile from './UploadFile';

import classNames from 'classnames';
import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function QueryFormContainer(props) {
  const { classes, handleChange, handleSubmit, values } = props;
  const [expand, setExpand] = useState(false);

  return (
    <div className={classes.searchContainer}>
      <ChipWithIcon
        value={values.pdbIds}
        nameVal='pdbIds'
        handleChange={handleChange}
      />
      <TextField
        name='ecNumber' 
        value={values.ecNumber || ''}
        onChange={e => handleChange(e, 0)}
        className={classes.smallInput}
        label='EC Class'
      />
      <TextField
        name='precision'
        value={values.precision || ''}
        onChange={e => handleChange(e, 0)}
        className={classes.smallInput}
        label='Precision'
      />
      <UploadFile
        handleChange={handleChange}
        label=''
        inputName='customMotifStructure'
        buttonText='Custom'
        files={values.customMotifStructure}
      />
      <div className={classes.floatButton}>
        <Button className={classes.cancelButton} onClick={(e) => handleChange(e, 5)}>Clear</Button>
        <Button name='search' className={classes.rounded} onClick={(e) => {
          handleChange(e, 4)
        }}>Search</Button>
      </div>
    </div>
  );
}

QueryFormContainer.propTypes = {
  classes: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default withStyles(styles)(QueryFormContainer);
