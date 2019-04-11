import React, { useState } from 'react';
import PropTypes from 'prop-types';

import BuildIcon from '@material-ui/icons/Build';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RestoreIcon from '@material-ui/icons/Restore';

import QueryFormContainer from './form/query/QueryFormContainer';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function SideMenu(props) {
  const { classes, handleSubmit, setPdbIds, setEcMask, setRMSD, setFiles } = props;
  const [isQueryTab, setQueryTab] = useState(true);
  const [isResultsTab, setResultsTab] = useState(true);

  const [selectedResultTab, setSelectedResultTab] = useState(false);
  const [resultTab, setResultTab] = useState(false);


  return (
    <>
      <Card className={classNames(classes.search, classes.marginTop)} >
        <ListItem button >
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText inset primary="Query" onClick={() => setQueryTab(!queryTab)}/>
          {this.state.expand ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={!this.state.build}>
          <SearchContainer />
        </Collapse>
      </Card>
      <Card className={classes.search} >
        <ListItem button >
          <ListItemIcon>
            {this.props.status === 'pending' ?  <CircularProgress className={classes.blueGradient} /> :   <RestoreIcon />}
          </ListItemIcon>
          <ListItemText inset primary='Result List' onClick={() => setResultTab(!resultTab)}/>
            {this.state.results ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.results} className={classes.resultBox}>
        </Collapse>
      </Card>
      <div className={classes.search}>
        {this.props.status === 'success' ? <DetailCard /> : <></>}
      </div>
    </>
  );
}

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setPdbIds: PropTypes.func.isRequired,
  setEcMask: PropTypes.func.isRequired,
  setRMSD: PropTypes.func.isRequired,
  setFiles: PropTypes.func.isRequired
};

export default withStyles(styles)(SideMenu);
