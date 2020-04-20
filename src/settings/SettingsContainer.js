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
  const {classes, setShowSettings, queryProteinMode, setQueryProteinMode, motifProteinMode, setMotifProteinMode,
    dockingProteinMode, setDockingProteinMode, activeSitesMode, setActiveSitesMode, ligandMode, 
    setLigandMode, dockingSearchCenter, setDockingSearchCenter, dockingSearchRange, setDockingSearchRange} = props;
  const [formDockingCenter, setFormDockingCenter] = useState(dockingSearchCenter);
  const [formDockingRange, setFormDockingRange] = useState(dockingSearchRange);
    const [formQueryProteinMode, setFormQueryProteinMode] = useState(queryProteinMode);
  const [formMotifProteinMode, setFormMotifProteinMode] = useState(motifProteinMode);
  const [formDockingProteinMode, setFormDockingProteinMode] = useState(dockingProteinMode);
  const [formActiveSitesMode, setFormActiveSitesMode] = useState(activeSitesMode);
  const [formLigandMode, setFormLigandMode] = useState(ligandMode);

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
        //prevents a click event on the settings to cause the settings menu to close 
        //(clicks elsewhere on the grid close the modal)
        onClick = {(e)=> e.stopPropagation()}
      >
        <Card children = {
          <div className = {classes.settingsContainer}>
            <DockingSearchBounds
              dockingSearchCenter = {formDockingCenter}
              setDockingSearchCenter = {setFormDockingCenter}
              dockingSearchRange =  {formDockingRange}
              setDockingSearchRange = {setFormDockingRange}
            />
            <DisplayMode
              displayMode = {formQueryProteinMode}
              setDisplayMode = {setFormQueryProteinMode}
              title = "Alignment Query Protein Display Mode"
              cartoonMode = 'false'
            />
            <DisplayMode
              displayMode = {formMotifProteinMode}
              setDisplayMode = {setFormMotifProteinMode}
              title = "Alignment Motif Protein Display Mode"
              cartoonMode = 'false'
            />
            <DisplayMode
              displayMode = {formDockingProteinMode}
              setDisplayMode = {setFormDockingProteinMode}
              title = "Docking Protein Display Mode"
              cartoonMode = 'true'
            />
            <DisplayMode
              displayMode = {formActiveSitesMode}
              setDisplayMode = {setFormActiveSitesMode}
              title = "Docking Active Sites Display Mode"
              cartoonMode = 'false'
            />
            <DisplayMode
              displayMode = {formLigandMode}
              setDisplayMode = {setFormLigandMode}
              title = "Docking Ligand Display Mode"
              cartoonMode = 'false'
            />
            <div className={classes.settingsBoxFooter}>
              <Button name='apply-settings' className={classes.rounded} onClick={(e) => {
                setQueryProteinMode(formQueryProteinMode);
                setMotifProteinMode(formMotifProteinMode);
                setDockingProteinMode(formDockingProteinMode);
                setActiveSitesMode(formActiveSitesMode);
                setLigandMode(formLigandMode);
                
              }}>Apply</Button>
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