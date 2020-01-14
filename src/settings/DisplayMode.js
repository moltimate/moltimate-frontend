import React from 'react'

import {withStyles} from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel';

import styles from './styles.js'
import { FormLabel } from '@material-ui/core';

function DisplayMode(props){
  const {displayMode, setDisplayMode, title, classes} = props;
  //internal state of the form. Only gets applied if the user selects apply
  

  function handleRadio(){

  }

  return (
    <div className={classes.settingsGroupContainer}>
      <Typography className={classes.settingsSectionTitle}>{title}</Typography>
      <RadioGroup 
        value = {displayMode}
        onChange = {(event)=>setDisplayMode(event.target.value)}
      >
        <FormControlLabel
          control = {<input type="radio"/>}
          label = {"Backbone"}
          labelPlacement = "start"
          value = "backbone"
        />
        <FormControlLabel
          control = {<input type="radio"/>}
          label = {"Ball and Stick"}
          labelPlacement = "start"
          value = "ball+stick"
        />
        <FormControlLabel
          control = {<input type="radio"/>}
          label = {"Surface"}
          labelPlacement = "start"
          value = "surface-av"
        />
        <FormControlLabel
          control = {<input type="radio"/>}
          label = {"Van Der Waals"}
          labelPlacement = "start"
          value = "surface-vws"
        />
        <FormControlLabel
          control = {<input type="radio"/>}
          label = {"Wireframe"}
          labelPlacement = "start"
          value = "line"
        />
      </RadioGroup>
    </div>

    );

}

export default withStyles(styles)(DisplayMode)