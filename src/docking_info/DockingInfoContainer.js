import React from "react"

import Card from "@material-ui/core/Card"
import CloseIcon from "@material-ui/icons/Close"
import {withStyles} from "@material-ui/core/styles"

import styles from "./styles.js"
import LigandDetailsBox from "./LigandDetailsBox.js"

function DockingInfoContainer(props){
  const {classes} = props;

  return <Card 
      className = {classes.dockingInfoContainer}
      childicon={<CloseIcon/>}
      children = {<LigandDetailsBox/>}
    />
}

export default withStyles(styles)(DockingInfoContainer)