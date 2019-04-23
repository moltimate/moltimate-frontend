import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import useForm from '../../util/filter';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import Popover from '@material-ui/core/Popover';

import FilterInputs from './FilterInputs';

export default function FilterButton(props) {

  const { popoverContent, buttonTitle, icon, filters, handleFilters } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'ecNumberFilter' : null;

  return (
    <>
        <Button
          variant="contained"
          style={{margin: '20px 5px'}}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          {buttonTitle}
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <FilterInputs inputs={popoverContent} filters={filters} handleFilters={handleFilters}/>
        </Popover>
    </>
  );
}

FilterButton.propTypes = {
  classes: PropTypes.object,
  buttonTitle: PropTypes.string,
  icon: PropTypes.node,
};
