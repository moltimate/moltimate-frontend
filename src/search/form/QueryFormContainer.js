import React, { useState } from 'react';
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
import HelpIcon from '@material-ui/icons/Help'
import InfoIcon from '@material-ui/icons/Info';

import ChipWithIcon from './ChipWithIcon';
import Mask from './Mask';
import Slide from './Slide';
import UploadFile from './UploadFile';
import Tooltip from '@material-ui/core/Tooltip';

import classNames from 'classnames';
import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function QueryFormContainer(props) {
  const { classes, handleChange, values } = props;
  const [expand, setExpand] = useState(false);

  return (
    <div className={classes.searchContainer}>
      <div className={classes.flexStretch}>
        <ChipWithIcon
          value={values.pdbIds}
          nameVal='MARK'
          handleChange={handleChange}
        />
        <Tooltip className={classes.labelTooltip}
          title={
            <div className={classes.helpText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>}>
              <InfoIcon/>
        </Tooltip>
      </div>
      <div className={classes.flexStretch}>
        <TextField
          name='ecNumber'
          value={values.ecNumber || ''}
          onChange={e => handleChange(e, 0)}
          className={classes.smallInput}
          label='Mark'
          /><Tooltip  className={classes.labelTooltip}
          title={
            <div className={classes.helpText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>} ><InfoIcon/></Tooltip>
        <TextField
          name='precision'
          value={values.precision || ''}
          onChange={e => handleChange(e, 0)}
          className={classes.smallInput}
          label='Precision'
          /><Tooltip className={classes.labelTooltip}
          title={
            <div className={classes.helpText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>} ><InfoIcon/></Tooltip>
        </div>
        <div className={classes.flexStretch}>
        <UploadFile
          handleChange={handleChange}
          label=''
          inputName='customMotifStructure'
          buttonText='Custom'
          files={values.customMotifStructure}
          />
          <Tooltip className={classes.buttonTooltip}
          title={
            <div className={classes.helpText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>}><InfoIcon/></Tooltip>
        </div>
        <div className={classes.floatButton}>
          <Button className={classes.cancelButton} onClick={(e) => handleChange(e, 5)}>Clear</Button>
          <Button name='search' className={classes.rounded} onClick={(e) => handleChange(e, 4)}>Search</Button>
        </div>
      </div>
  );
}

QueryFormContainer.propTypes = {
  classes: PropTypes.object,
  handleChange: PropTypes.func
};

export default withStyles(styles)(QueryFormContainer);
