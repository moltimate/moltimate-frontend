import React from 'react'

import {withStyles} from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel';

import styles from './styles.js'
import { FormLabel } from '@material-ui/core';

function DisplayMode(props){
  const {displayMode, setDisplayMode, title, cartoonMode, classes} = props;
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
          label = {"Ball and Stick"}
          labelPlacement = "start"
          value = "ball+stick"
          className={classes.displayModeRadio}
        />
        {cartoonMode == 'true' ? <FormControlLabel
          control = {<input type="radio"/>}
          label = {"Cartoon"}
          labelPlacement = "start"
          value = "cartoon"
          className={classes.displayModeRadio}
        />:null}
        <FormControlLabel
          control = {<input type="radio"/>}
          label = {"Surface"}
          labelPlacement = "start"
          value = "surface-av"
          className={classes.displayModeRadio}
        />
        <FormControlLabel
          control = {<input type="radio"/>}
          label = {"Van Der Waals"}
          labelPlacement = "start"
          value = "surface-vws"
          className={classes.displayModeRadio}
        />
        <FormControlLabel
          control = {<input type="radio"/>}
          label = {"Wireframe"}
          labelPlacement = "start"
          value = "line"
          className={classes.displayModeRadio}
        />
      </RadioGroup>
    </div>

    );

}

export default withStyles(styles)(DisplayMode)
