import React from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';

import UploadFile from './UploadFile';

function Upload(props) {
  return (
    <>
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
    </>
  );
}

Upload.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  files: PropTypes.array
};

export default Upload;
