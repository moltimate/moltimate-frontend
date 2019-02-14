import React from 'react';
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input';
import Chip from '@material-ui/core/Chip';
import UploadFile from './UploadFile';
import DoneIcon from '@material-ui/icons/Done';

class MultInputChip extends React.Component {

  // TODO Change chip icon
  render() {
    return (
      <>
        <ChipInput
          id='pdbIds'
          defaultValue={[]}
          fullWidth
          label='PDB Names'
          placeholder='Press enter to add'
          onChange={this.props.handleChange}
        />
      </>
    );
  }
}

/*
<UploadFile handleUpload={this.props.handleUpload}/>
{ this.props.files.map(f => {
  return (
    <Chip
      key={f.name}
      onDelete={() => this.props.deleteFile(f.name)}
      style={{ margin: '10px'}}
      label={f.name}
    />);
})}
*/

MultInputChip.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  files: PropTypes.array,
};

export default MultInputChip;
