import React from 'react'

import {withStyles} from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import styles from './styles.js'
import { TextField, FormControl } from '@material-ui/core';

function DockingSearchBounds(props){
  const{classes} = props

  /*
  Generates a FormGroup for inputting a coordinate's min and max 
  This FormGroup is not functional, is not tied to any state.

  inputs: 
    coordinate_name: the name of the coordinate to offer input for
  outputs: react element containing a row for inputting min and max coordinates
  */
  function generateCoordinateFormRow(coordinate_name){

    //control = {<TextField variant = "outlined" className = {classes.coordinateTextField}/>}
    return(
      <FormGroup row>
        <FormControlLabel
          className = {classes.coordinateLabeledInput}
          control = {<input type="text" className = {classes.coordinateTextField}/>}
          label = {"Min " + coordinate_name +": "}
          labelPlacement = "start"
        />
        <FormControlLabel
          height = "25px"
          control = {<input type="text" className = {classes.coordinateTextField}/>}
          label = {"Max " + coordinate_name +": "}
          labelPlacement = "start"
        />
      </FormGroup>
    );
  }


  return(
    <div className={classes.settingsGroupContainer}>
      <Typography className={classes.settingsSectionTitle}>Docking Search Bounds</Typography>
      {generateCoordinateFormRow("X")}
      {generateCoordinateFormRow("Y")}
      {generateCoordinateFormRow("Z")}
    </div>
  );
}

export default withStyles(styles)(DockingSearchBounds)