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

import ChipWithIcon from './ChipWithIcon';
import Mask from './Mask';
import Slide from './Slide';
import UploadFile from './UploadFile';

import classNames from 'classnames';
import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function QueryFormContainer(props) {
  const { classes, handleChange, handleSubmit } = props;
  const [expand, setExpand] = useState(false);

  return (
    <Card className={classNames(classes.search)} >
      <ListItem button onClick={() => setExpand(!expand)} >
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText className={classes.white} inset primary='Search' />
        {expand ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={expand}>
        <div style={{width: '300px', marginLeft: '10%'}}>
          <ChipWithIcon handleChange={() => console.log("Input changed")}/>
          <Input
            value=''
            onChange={() => console.log("Input changed")}
            id='ecnumber'
            inputComponent={Mask}
          />
          <TextField
            className={classes.smallInput}
            id='precision'
            label='Precision'/>
          <Slide handleChange={() => console.log("Input changed")}/>
          <UploadFile handleUpload={() => console.log("Input changed")} label='Custom Motifs'/>

          <div className={classes.floatButton}>
            <Button className={classes.cancelButton}>Clear</Button>
            <Button className={classes.rounded} onClick={handleSubmit}>Search</Button>
          </div>
        </div>
      </Collapse>
    </Card>
  );
}

QueryFormContainer.propTypes = {
  classes: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default withStyles(styles)(QueryFormContainer);
