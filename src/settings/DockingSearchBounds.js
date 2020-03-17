import React, {useState} from 'react'

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
  const{classes, dockingSearchCenter, setDockingSearchCenter, dockingSearchRange, 
    setDockingSearchRange} = props

  /**
   * Given a the value and setter for an array, an index, and a new value, set the given
   * index in the given array to the given value
   * 
   * @param {Array} coordinateValue - the current value of the array
   * @param {Function} coordinateSetter - the setter function for the array
   * @param {int} coordinateIndex - the index of the element to be changed
   * @param {*} newValue - the new value to be entered into the array
   */
  function setSingleCoordinate(coordinateValue, coordinateSetter, coordinateIndex, newValue){
    var newCoordinateValue = coordinateValue;
    newCoordinateValue[coordinateIndex] = newValue;
    coordinateSetter(newCoordinateValue);
  }

  /**
    Generates a FormGroup for inputting a coordinate's min and max 
    This FormGroup is not functional, is not tied to any state.

    @param {string} coordinateName - the name of the coordinate to offer input for.
    @param {int} coordinateIndex - the index which represents the selected coordinate in
      the dockingSearchCenter and dockingBoundaries state objects.
    @returns {React.Component}
  */
  function generateCoordinateFormRow(coordinateName, coordinateIndex){
    return(
      <FormGroup row>
        <FormControlLabel
          className = {classes.coordinateLabeledInput}
          control = {<input type="text" className = {classes.coordinateTextField}/>}
          label = {"Center " + coordinateName +": "}
          labelPlacement = "start"
          onChange = {(e) => {
            setSingleCoordinate(
              dockingSearchCenter, 
              setDockingSearchCenter, 
              coordinateIndex, 
              e.target.value)
          }}
          value = {dockingSearchCenter[coordinateIndex].toString()}
        />
        <FormControlLabel
          height = "25px"
          control = {<input type="text" className = {classes.coordinateTextField}/>}
          label = {"Range " + coordinateName +": "}
          labelPlacement = "start"
          onChange = {(e) => {
            setSingleCoordinate(
              dockingSearchRange, 
              setDockingSearchRange, 
              coordinateIndex, 
              e.target.value)
          }}
          value = {dockingSearchRange[coordinateIndex].toString()}
        />
      </FormGroup>
    );
  }


  return(
    <div className={classes.settingsGroupContainer}>
      <Typography className={classes.settingsSectionTitle}>
        Docking Search Bounds
      </Typography>
      {generateCoordinateFormRow("X",0)}
      {generateCoordinateFormRow("Y",1)}
      {generateCoordinateFormRow("Z",2)}
    </div>
  );
}

export default withStyles(styles)(DockingSearchBounds)