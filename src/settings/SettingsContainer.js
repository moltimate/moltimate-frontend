import React, {useState} from 'react';

import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/styles';

import styles from './styles.js';
import DockingSearchBounds from './DockingSearchBounds.js';
import DisplayMode from './DisplayMode.js';

function SettingsContainer(props){
  const {classes, setShowSettings, displayMode, setDisplayMode} = props;
  const [formDisplayMode, setFormDisplayMode] = useState(displayMode);

  var modalCard = 
    <Grid
      container
      alignItems = "center"
      justify = "center"
      className={classes.fullScreen}
      //when the grid (which overlaps the background of the settings modal) is clicked, close the settings menu
      onClick = {() => setShowSettings(false)}
    >
      <Grid 
        item xs= {4}
        //prevents a click event on the settings to cause the settings menu to close 
        //(clicks elsewhere on the grid close the modal)
        onClick = {(e)=> e.stopPropagation()}
      >
        <Card children = {
          <div className = {classes.settingsContainer}>
            <DockingSearchBounds/>
            <DisplayMode
              displayMode = {formDisplayMode}
              setDisplayMode = {setFormDisplayMode}
            />
            <div className={classes.settingsBoxFooter}>
              <Button name='apply-settings' className={classes.rounded} onClick={(e) => setDisplayMode(formDisplayMode)}>Apply</Button>
            </div>
          </div>}
        />
      </Grid>
    </Grid>;


  return(<Modal 
    open = {true} 
    children = {modalCard}
    //When the backdrop of the modal is clicked, close the modal
    />);
}

export default withStyles(styles)(SettingsContainer)