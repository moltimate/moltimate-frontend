import { useState, useEffect } from 'react';
import axios from 'axios';

import testMakerResponse from './testMakerResponse';
import testSearchResponse from './testSearchResponse';

// TODO make this a config file
const testQuery = 'http://localhost:8080/test/motif';
const searchQuery = 'http://localhost:8080/align/activesite';

const useForm = (callback) => {
  const [values, setValues] = useState({});
  const [result, setResult] = useState({
    data: null,
    complete: false,
    pending: false,
    error: {
      type: null,
      message: null,
    },
  });
  const [request, setRequest] = useState(null);
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    e.persist();
    const eventMode = e.target.name;

    const queryURL = e.target.name === 'test' ? testQuery : searchQuery;

    const form_data = new FormData();
    for ( let key in values ) {
      if ( String(key) === 'activeSiteResidues') {
        form_data.append(key, values.activeSiteResidues.map(a => {
          return `${a.residueName} ${a.residueChainName} ${a.residueId}`
        }));
      } else {
        form_data.append(key, values[key]);
      }
    }

    setResult({
      data: null,
      pending: true,
      error: {
        type: null,
        message: null,
      },
      complete: false,
      mode: eventMode,
    });

    axios.post(queryURL, form_data)
      .then(result =>
        setResult({
          data: result.data,
          pending: false,
          error: {
            type: null,
            message: null,
          },
          complete: true,
          mode: eventMode,
        })
      ).catch(() =>
          setResult({
            data: null,
            pending: false,
            error: {
              type: 500,
              message: 'The result could not be retrieve',
            },
            complete: true
          })
        );
  };

  /* Generic input handleChange */
  const handleChange = (e) => {
    e.persist();
    setValues(values => ({ ...values, [e.target.name]: e.target.value }));
  };

  /* Chipinput API only returns the value, not a full event */
  const handleChipInput = (e, key) => {
    setValues(values => ({ ...values, [key]: e}))
  }

  // TODO
  const handleFileUpload = (e) => {
    setValues(values => ({ ...values, [e.target.name]: Array.from(e.target.files)}));
  }

  /* Use this to create alignment objects for active site residue array */
  const handleResidues = (e) => {
    e.persist();
    const copy = values.activeSiteResidues;
    copy[e.target.id] = { ...copy[e.target.id], [e.target.name]: e.target.value};
    setValues(values => ({ ...values, activeSiteResidues: copy}));
  }

  /* Clears the values of state */
  const handleClearValues = (e) => {
    setValues({});
    setResult({
      data: null,
      complete: false,
      pending: false,
      error: {
        type: null,
        message: null,
      },
    });
  }

  const handleFileDelete = (value, x, key) => {
    const copy = values[key].filter((f) => {
      return f.name !== value;
    });
    setValues(values => ({ ...values, [key]: copy}));
  }

  return {
    handleChange,
    handleSubmit,
    handleFileUpload,
    handleChipInput,
    handleResidues,
    handleClearValues,
    handleFileDelete,
    values,
    result,
  }
};

export default useForm;
